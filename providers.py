import json
import uuid

def json_to_sql_insert(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)

    # Note: Adjusting for UUIDs on provider inserts, if necessary
    provider_inserts = [
        # Assuming provider_id should also be UUID; replace with uuid.uuid4() if needed
        f"INSERT INTO providers (provider_id, name, specialty) VALUES ('{uuid.uuid4()}', '{provider['name']}', '{provider['specialty']}');"
        for provider in data['providers']
    ]

    cpt_code_inserts = [
        f"INSERT INTO cpt_code (id, code, description) VALUES ('{uuid.uuid4()}', '{cpt['cpt_code']}', '{cpt['description']}');"
        for cpt in data['cpt_codes']
    ]

    all_inserts = provider_inserts + cpt_code_inserts 
    return all_inserts

insert_statements = json_to_sql_insert('providers.json')
for statement in insert_statements:
    print(statement)
