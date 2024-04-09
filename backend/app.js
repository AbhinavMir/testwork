require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

let cronSchedule = '0 0 1 * *'; // Default schedule: At 00:00 on day-of-month 1.
let cronJob = null;


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/payers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/gold-carding-rules', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gold_carding_rules');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/payer-gold-carding-eligibility', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payer_gold_carding_eligibility');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Endpoint to get all providers
app.get('/providers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM providers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Endpoint to get all CPT codes
app.get('/cpt-codes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cpt_codes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Endpoint to get provider CPT approval status
app.get('/provider-cpt-approval', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM provider_cpt_approval');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/goldcarding-eligibility', async (req, res) => {
    try {
        // Retrieve all gold carding rules
        const rules = await pool.query('SELECT * FROM gold_carding_rules');

        // Retrieve metrics for all providers
        const metricsQuery = `
        SELECT
          p.provider_id,
          p.name,
          COUNT(pca.provider_id) FILTER (WHERE pca.approval_status = true) AS approved_requests,
          COUNT(pca.provider_id) AS total_requests,
          COUNT(pca.provider_id) FILTER (WHERE pca.approval_status = true) * 100.0 / NULLIF(COUNT(pca.provider_id), 0) AS approval_rate
        FROM
          providers p
        LEFT JOIN
          provider_cpt_approval pca ON p.provider_id = pca.provider_id
        GROUP BY
          p.provider_id;
      `;
        const metricsResult = await pool.query(metricsQuery);

        // Apply gold carding rules to metrics to determine eligibility
        const eligibilityResults = metricsResult.rows.map(provider => {
            const providerRules = rules.rows.filter(rule => rule.payer_id === provider.payer_id);
            let isEligible = true;
            let reasons = [];

            providerRules.forEach(rule => {
                switch (rule.metric) {
                    case 'approval_rate':
                        if (provider.approval_rate < parseFloat(rule.threshold)) {
                            isEligible = false;
                            reasons.push(`Approval rate below threshold: ${rule.threshold}%`);
                        }
                        break;
                    case 'submission_volume':
                        if (provider.total_requests < parseInt(rule.threshold)) {
                            isEligible = false;
                            reasons.push(`Submission volume below threshold: ${rule.threshold}`);
                        }
                        break;
                    // Add more cases as needed for other metrics
                }
            });

            return {
                provider_id: provider.provider_id,
                name: provider.name,
                isEligible,
                reasons
            };
        });

        res.json(eligibilityResults);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.post('/providers', async (req, res) => {
    const { name, specialty, NPI_number, email, phone_number } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO providers (name, specialty, NPI_number, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, specialty, NPI_number, email, phone_number]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/payers', async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO payers (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/gold-carding-rules', async (req, res) => {
    const { payer_id, description, metric, threshold, measurement_period_months } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO gold_carding_rules (payer_id, description, metric, threshold, measurement_period_months) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [payer_id, description, metric, threshold, measurement_period_months]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/cpt-codes', async (req, res) => {
    const { code, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cpt_codes (code, description) VALUES ($1, $2) RETURNING *',
            [code, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/provider-cpt-approval', async (req, res) => {
    const { provider_id, cpt_code, approval_status, denial_reason } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO provider_cpt_approval (provider_id, cpt_code, approval_status, denial_reason) VALUES ($1, $2, $3, $4) RETURNING *',
            [provider_id, cpt_code, approval_status, denial_reason]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

const startCronJob = () => {
    if (cronJob) {
        cronJob.stop(); // Stop the current job if it's running.
    }
    cronJob = cron.schedule(cronSchedule, async () => {
        console.log(`Running scheduled task: ${new Date().toString()}`);
        // Place your cron job logic here.
    });
    console.log(`Cron job scheduled with: "${cronSchedule}"`);
};

app.get('/trigger-cron-job', (req, res) => {
    // Assuming the cron job's task is abstracted in a function:
    async function cronTask() {
        console.log(`Manually triggered task at ${new Date().toString()}`);
        // Your task logic here.
    }
    cronTask()
        .then(() => res.send('Cron job task manually triggered.'))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error triggering cron job task.');
        });
});

app.post('/update-cron-frequency', (req, res) => {
    const { frequency } = req.body; // Expecting frequency in cron format.
    if (!frequency) {
        return res.status(400).send('Frequency is required and must be in cron format.');
    }
    cronSchedule = frequency;
    startCronJob(); // Restart the cron job with the new frequency.
    res.send(`Cron job frequency updated to: "${frequency}"`);
});

startCronJob();
app.get('/', (req, res) => {
    res.json({
        endpoints: [
            { method: "GET", path: "/", description: "List all available endpoints." },
            { method: "GET", path: "/payers", description: "Get all payers from the payers table." },
            { method: "GET", path: "/gold-carding-rules", description: "Get all gold carding rules from the gold_carding_rules table." },
            { method: "GET", path: "/payer-gold-carding-eligibility", description: "Get all payer gold carding eligibility records from the payer_gold_carding_eligibility table." },
            { method: "GET", path: "/providers", description: "Get all providers from the providers table." },
            { method: "GET", path: "/cpt-codes", description: "Get all CPT codes from the cpt_codes table." },
            { method: "GET", path: "/provider-cpt-approval", description: "Get all provider CPT approval statuses from the provider_cpt_approval table." },
        ]
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port} - link: http://localhost:${port}`);
});