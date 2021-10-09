import { CsvReader } from "../csv_reader"
import path from 'path'

describe("Teste da clase CsvReader", () => {

    test("Testando o método importarCSV", async () => {

        const dir = path.join(__dirname,'..','..','csv','samples.csv')

        const data = await CsvReader.importCsv(dir)
        
        expect(data.samples.length).toBeGreaterThan(0)

    })

})