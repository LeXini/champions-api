const { pool } = require("../config");
const { request, response } = require("express");

const getCampeao = (request, response) => {
    pool.query("select c.codigo as codigo, c.nome as nome, c.dificuldade as dificuldade,\
    c.funcao as funcao, f.nome as funcao_nome \
    from campeoes c\
    join funcoes f on f.codigo = c.funcao order by c.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os campeões: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getCampeao = getCampeao;

const addCampeao = (request, response) => {
    const { nome , dificuldade, funcao } = request.body

    pool.query(
        'insert into campeoes (nome , dificuldade, funcao) values ($1, $2, $3)',
        [nome , dificuldade, funcao],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o campeão: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Campeão criado.' })
        }        
    )
}

module.exports.addCampeao = addCampeao;


const updateCampeao = (request, response) => {
    const { codigo, nome , dificuldade, funcao } = request.body

    pool.query(
        'update campeoes set nome = $1, dificuldade = $2, funcao = $3 where codigo = $4',
        [nome , dificuldade, funcao, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o campeão: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Campeão atualizado.' })
        }        
    )
}

module.exports.updateCampeao = updateCampeao;

const deleteCampeao = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from campeoes where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o campeão: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Campeão removido.' })
        }        
    )
}

module.exports.deleteCampeao = deleteCampeao;

const getCampeaoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select c.codigo as codigo, c.nome as nome, c.dificuldade as dificuldade,\
        c.funcao as funcao, f.nome as funcao_nome \
        from campeoes c \
        join funcoes f on f.codigo = c.funcao where c.codigo = $1 order by c.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o campeão: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getCampeaoPorCodigo = getCampeaoPorCodigo;