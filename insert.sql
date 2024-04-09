CREATE TABLE payers
  (
     payer_id    INT PRIMARY KEY,
     NAME        VARCHAR(255),
     description TEXT
  );

CREATE TABLE gold_carding_rules
  (
     rule_id                   INT PRIMARY KEY,
     payer_id                  INT,
     description               TEXT,
     metric                    VARCHAR(255),
     threshold                 VARCHAR(50),
     measurement_period_months VARCHAR(50),
     FOREIGN KEY (payer_id) REFERENCES payers(payer_id)
  );

CREATE TABLE payer_gold_carding_eligibility
  (
     eligibility_id INT PRIMARY KEY,
     payer_id       INT,
     provider_id    INT,
     cpt_code       VARCHAR(50),
     is_eligible    BOOLEAN,
     reason         TEXT,
     FOREIGN KEY (payer_id) REFERENCES payers(payer_id),
     FOREIGN KEY (provider_id) REFERENCES providers(provider_id)
  -- Assumes cpt_code is referenced from the cpt_codes table. If not, remove this constraint.
  );

CREATE TABLE providers
  (
     provider_id INT PRIMARY KEY,
     NAME        VARCHAR(50),
     specialty   VARCHAR(50)
  );

CREATE TABLE cpt_codes
  (
     cpt_code    VARCHAR(50) PRIMARY KEY,
     description VARCHAR(255)
  );

CREATE TABLE provider_cpt_approval
  (
     provider_id     INT,
     cpt_code        VARCHAR(50),
     approval_status BOOLEAN,
     denial_reason   VARCHAR(255),
     FOREIGN KEY (provider_id) REFERENCES providers(provider_id),
     FOREIGN KEY (cpt_code) REFERENCES cpt_codes(cpt_code)
  );

INSERT INTO payers
            (payer_id,
             NAME,
             description)
VALUES      (1,
             'HealthyLife Insurance',
'Nationwide health insurance provider offering a range of healthcare plans.'),
            (2,
             'WellCare Insurance',
'A leading health insurance company focused on preventive care and wellness.');

INSERT INTO gold_carding_rules
            (rule_id,
             payer_id,
             description,
             metric,
             threshold,
             measurement_period_months)
VALUES      (1,
             1,
'Providers must have an approval rate of 95% or higher for all PA requests over the past 12 months.'
             ,
'approval_rate',
'95',
'12'),
            (2,
             1,
'Providers must have submitted at least 100 PA requests in the past 12 months.',
'submission_volume',
'100',
'12'),
            (3,
             2,
'Providers must demonstrate 90% adherence to treatment guidelines for chronic conditions.'
             ,
'guideline_adherence',
'90',
'12');

INSERT INTO payer_gold_carding_eligibility
            (eligibility_id,
             payer_id,
             provider_id,
             cpt_code,
             is_eligible,
             reason)
VALUES      (1,
             1,
             1,
             '99213',
             true,
             NULL),
            (2,
             1,
             2,
             '93306',
             false,
             'Below minimum submission volume'),
            (3,
             2,
             3,
             '83036',
             true,
             NULL);

INSERT INTO cpt_codes
            (cpt_code,
             description)
VALUES      ('99213',
             'Office or other outpatient visit'),
            ('99214',
             'Detailed office or other outpatient visit'),
            ('93306',
             'Echocardiography'),
            ('83036',
             'Hemoglobin A1C level'),
            ('12002',
             'Simple wound repair');

INSERT INTO providers
            (provider_id,
             NAME,
             specialty)
VALUES      (1,
             'Dr. A',
             'Cardiology'),
            (2,
             'Dr. B',
             'Endocrinology'),
            (3,
             'Dr. C',
             'General Surgery'),
            (4,
             'Dr. D',
             'Orthopedics'),
            (5,
             'Dr. E',
             'Pediatrics'),
            (6,
             'Dr. F',
             'Neurology'),
            (7,
             'Dr. G',
             'Dermatology'),
            (8,
             'Dr. H',
             'Ophthalmology'),
            (9,
             'Dr. I',
             'Psychiatry'),
            (10,
             'Dr. J',
             'Rheumatology');

INSERT INTO provider_cpt_approval
            (provider_id,
             cpt_code,
             approval_status,
             denial_reason)
VALUES      (1,
             '93306',
             true,
             NULL),
            (2,
             '83036',
             true,
             NULL),
            (3,
             '12002',
             false,
             'Incomplete documentation'),
            (4,
             '99214',
             false,
             'Lack of prior necessary diagnosis'),
            (5,
             '99213',
             true,
             NULL),
            (6,
             '83036',
             true,
             NULL),
            (7,
             '93306',
             false,
             'Out of policy coverage'),
            (8,
             '12002',
             true,
             NULL),
            (9,
             '99214',
             true,
             NULL),
            (10,
             '99213',
             false,
             'Lack of medical necessity'); 