const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const controleFuncao = require('./controladores/funcoes')
const controleCampeao = require('./controladores/campeoes')

app
    .route('/funcoes')
    .get(controleFuncao.getFuncao)
    .post(controleFuncao.addFuncao)
    .put(controleFuncao.updateFuncao)

app
    .route('/funcoes/:codigo')
    .get(controleFuncao.getFuncaoPorCodigo)
    .delete(controleFuncao.deleteFuncao)

app
    .route('/campeoes')
    .get(controleCampeao.getCampeao)
    .post(controleCampeao.addCampeao)
    .put(controleCampeao.updateCampeao)

app
    .route('/campeoes/:codigo')
    .get(controleCampeao.getCampeaoPorCodigo)
    .delete(controleCampeao.deleteCampeao)

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})


