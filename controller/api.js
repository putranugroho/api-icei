// const axios = require("../Services/API");
const db = require("../connection");
const moment = require("moment");
moment.locale("id");

// API untuk list BPR
const user_lms = async (req, res) => {
    try {
        let response = await db.sequelize.query(
            `SELECT * FROM master_user_lms`,
            {
                type: db.sequelize.QueryTypes.SELECT,
            }
        );
        if (!response.length) {
            res.status(200).send({
                code: "002",
                status: "Failed",
                message: "Gagal Mencari List BPR",
                data: null, 
            });
        } else {
            res.status(200).send({
                code: "000",
                status: "ok",
                message: "Success",
                data: response,
            });
        }
    } catch (error) {
        //--error server--//
        console.log("erro get product", error);
        res.send(error);
    }
};

// API untuk list BPR
const mk_lms = async (req, res) => {
    try {
        let response = await db.sequelize.query(
            `SELECT * FROM master_course`,
            {
                type: db.sequelize.QueryTypes.SELECT,
            }
        );
        if (!response.length) {
            res.status(200).send({
                code: "002",
                status: "Failed",
                message: "Gagal Mencari List BPR",
                data: null, 
            });
        } else {
            res.status(200).send({
                code: "000",
                status: "ok",
                message: "Success",
                data: response,
            });
        }
    } catch (error) {
        //--error server--//
        console.log("erro get product", error);
        res.send(error);
    }
};

// API untuk list BPR
const report_mk_nasional = async (req, res) => {
    try {
        let response = await db.sequelize.query(
            `SELECT * FROM report_mk_nasional`,
            {
                type: db.sequelize.QueryTypes.SELECT,
            }
        );
        if (!response.length) {
            res.status(200).send({
                code: "002",
                status: "Failed",
                message: "Gagal Mencari List BPR",
                data: null, 
            });
        } else {
            res.status(200).send({
                code: "000",
                status: "ok",
                message: "Success",
                data: response,
            });
        }
    } catch (error) {
        //--error server--//
        console.log("erro get product", error);
        res.send(error);
    }
};

module.exports = {
    user_lms,
    mk_lms,
    report_mk_nasional
};