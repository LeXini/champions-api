const { pool } = require('../config')
const { request, response } = require("express");

const getFuncao = (request, response) => {
    
    pool.query("select * from funcoes order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as funções: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getFuncao = getFuncao;

const addFuncao = (request, response) => {

    const { nome , caracteristica } = request.body

    pool.query(
        'insert into funcoes (nome, caracteristica) values ($1, $2)',
        [nome, caracteristica],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir as funcões: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Função criada.' })
        }        
    )
}

module.exports.addFuncao = addFuncao;

const updateFuncao = (request, response) => {

    const { codigo, nome , caracteristica } = request.body

    pool.query(
        'update funcoes set nome = $1, caracteristica = $2 where codigo = $3',
        [nome, caracteristica, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar as funções: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Função atualizada.' })
        }        
    )
}

module.exports.updateFuncao = updateFuncao;

const deleteFuncao  = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from funcoes where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a função: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Função removida.' })
        }        
    )
}

module.exports.deleteFuncao = deleteFuncao;

const getFuncaoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from funcoes where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a função: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getFuncaoPorCodigo = getFuncaoPorCodigo;