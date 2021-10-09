import { Neuron } from "./neuron"

export class Adaline {

    // Obtem um conjunto de amostras (x)
    private samples: number[][]

    // Obtem um conjunto de saídas desejadas associados às amostras (d)
    private outputs: number[]

    // Taxa de aprendizagem (n)
    private learningRate: number

    // Taxa de precisão requerida (e)
    private precision: number

    // Número de épocas
    private epoch: number = 0

    // Neurônio utilizado no algoritmo Adaline
    private neuron: Neuron

    constructor(samples: number[][], outputs: number[], learningRate: number, precision: number) {
        this.samples = samples
        this.outputs = outputs
        this.learningRate = learningRate
        this.precision = precision

        // Cria um neurônio com a mesma quantidade de pesos da quantidade de entradas nas amostas
        this.neuron = new Neuron(samples[0].length)
    }

    // Inicia o algoritmo de Adaline para aprendizado de máquina
    public learn() {

        let running: boolean = true

        while (running) {

            // Calcula o Eqm anterior
            let before_eqm = this.getEqm(this.samples, this.outputs)

            this.samples.map((inputs, i) => {

                // Recebe o potencial de ativação (u)
                const u = this.neuron.getActivationPotential(inputs)

                // Ajusta os pesos do neurônio
                // taxa de aprendizagem = n, saída desejada = d, potencial de ativação = u, entradas da amostra atual = x[]
                this.neuron.adjustWeights(this.learningRate, this.outputs[i], u, inputs)

            })

            // Incrementa a época
            this.epoch = this.epoch + 1

            // Calcula o Eqm após os ajustes de pesos
            let after_eqm = this.getEqm(this.samples, this.outputs)

            // Se o módulo da diferença entre o Eqm aterior e o Eqm posterior for
            // menor ou igual à precisão é porque o neurônio aprendeu com as amostras
            if (this.module(after_eqm - before_eqm) <= this.precision)
                running = false

        }

    }

    // Método para calcular O Eqm (Erro quadrático médio)
    private getEqm(samples: number[][], outputs: number[]): number {

        // Recebe a quantidade de padrões de treinamentos
        let p: number = samples.length

        // Inicia a variável Eqm com zero
        let eqm: number = 0

        // Para todas as amostras de treinamento, fazer:
        samples.map((inputs, i) => {

            // Calcula o potencial de ativação (u)
            const u = this.neuron.getActivationPotential(inputs)

            // Recebe a saída esperada
            const d = outputs[i]

            // Acumula a diferença entre o valor desejado e o potencial de ativação elevado
            // ao quadrado
            eqm = eqm + Math.pow((d - u), 2)

        })

        // Retorna a média dos erros quadráticos
        return eqm / p

    }

    public getNeuron() {
        return this.neuron
    }

    public getEpoch() {
        return this.epoch
    }

    // Método para realizar a predição, baseado no amostra informada
    public predict(samples: number[][]): number[] {

        // É a lista com as predições
        let predictions: number[] = []

        samples.map((inputs) => {

            // Calcular o potencial de ativação (u)
            const activationPotential = this.neuron.getActivationPotential(inputs);

            // Calcular o valor de saída (y)
            const prediction = this.activationFunction(activationPotential)

            // Adiciona a predição à lista
            predictions.push(prediction)

        })
        
        return predictions

    }

    // Função de ativação que retorna a classificação y=g(u)
    private activationFunction(activationPotential: number): number {

        if (activationPotential >= 0)
            return 1
        else
            return -1
    }

    // Retorna o valor do módulo
    // Em outras palavras, sempre retorna um valor positivo
    private module(value: number): number {
        return Math.sqrt(Math.pow(value, 2))
    }

}