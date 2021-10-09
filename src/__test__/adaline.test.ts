import path from "path"
import { Adaline } from "../adaline"
import { CsvReader } from "../csv_reader"

describe("Realizar a predição das amostras que estão no arquivo ./csv/samples.csv", () => {

    let adaline: Adaline

    beforeAll(async () => {

        const dir = path.join(__dirname, '..', '..', 'csv', 'samples.csv')
        // Importar as amostras no csv
        const { samples, outputs } = await CsvReader.importCsv(dir)
        // Informa a taxa de aprendizagem
        const learningRate = 0.005
        // Informa a precisão do erro
        const precision = 0.001
        // Incia a classe Adaline
        adaline = new Adaline(samples, outputs, learningRate, precision)
        // Inicia o aprendizado de máquina
        adaline.learn()
    })

    it("-0.1069, -3.2329, 0.1856, -2.4572 é para ter resultado igual a -1", () => {

        const result = adaline.predict([[-0.1069, -3.2329, 0.1856, -2.4572]])
        expect(result).toEqual([-1])

    })

    it("0.4662, 0.6261, 0.7304, 3.4370 é para ter resultado igual a -1", () => {

        const result = adaline.predict([[0.4662, 0.6261, 0.7304, 3.4370]])
        expect(result).toEqual([-1])

    })

    it("0.4353, -1.4066, 0.4207, -0.4879 é para ter resultado igual a 1", () => {

        const result = adaline.predict([[0.4353, -1.4066, 0.4207, -0.4879]])
        expect(result).toEqual([1])

    })


})