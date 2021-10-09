import { Adaline } from "./adaline"
import { CsvReader } from './csv_reader'
import path from "path"

// Taxa de aprendizagem (n)
const learningRate: number = 0.005

// Taxa de precisão requerida (e)
const precision: number = 0.001

// Classe para ler o arquivo csv que está dentro da pasta "csv" com as amostras
CsvReader.importCsv(path.join(__dirname, '../../csv/samples.csv'))
    .then(data => {

        // Inicia a classe Adaline, passando os paramêtros: amostra a ser treinada, as saídas desejadas, a taxa
        // de aprendizagem e a precisão do erro.
        const adaline = new Adaline(data.samples, data.outputs, learningRate, precision)

        // Método para o Adaline aprender
        adaline.learn()

        // Método para consultar a quantidade de épocas de aprendizagem
        adaline.getEpoch()

        // Método para trazer o nerônio utilizado para o treinamento.
        // Nele, você consegue ver os valores dos pesos e do limiar (Bias).
        adaline.getNeuron()

        // Uma vez aprendido, você chama esse método para realizar
        // a predição dos valores
        const result = adaline.predict([
            [-0.1069, -3.2329, 0.1856, -2.4572],
            [0.4662, 0.6261, 0.7304, 3.4370],
            [0.8298, -1.4089, 0.3119, 1.3235],
            [0.4353, -1.4066, 0.4207, -0.4879]
        ])
        

    })
