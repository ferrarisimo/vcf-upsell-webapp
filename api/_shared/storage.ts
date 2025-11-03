import { TableClient, AzureSASCredential } from '@azure/data-tables'

// Uses a SAS URL stored in process.env.TABLE_SAS_URL, pointing to a table named 'Submissions'
export function getTable(){
  const sas = process.env.TABLE_SAS_URL!
  const url = new URL(sas)
  const tableName = 'Submissions'
  return new TableClient(`${url.origin}${url.pathname}`, tableName, new AzureSASCredential(url.searchParams.toString().slice(1)))
}
