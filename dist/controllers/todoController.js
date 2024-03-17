"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.remove = exports.update = exports.add = exports.all = void 0;
const Todo_1 = require("../models/Todo");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield Todo_1.Todo.findAll();
    res.json({ list });
});
exports.all = all;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title) {
        const todo = yield Todo_1.Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201).json({ item: todo });
    }
    res.json({ error: "Dados não enviados" });
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let todo = yield Todo_1.Todo.findByPk(id);
    if (todo) {
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case "1":
                    todo.done = true;
                    break;
                case 'false':
                case "0":
                    todo.done = false;
                    break;
            }
        }
        yield todo.save();
        res.json({ item: todo });
    }
    else {
        res.json({ error: "Tarefa não encontrada" });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let todo = yield Todo_1.Todo.findByPk(id);
    if (todo) {
        yield todo.destroy();
    }
    res.json({});
});
exports.remove = remove;
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ pong: true });
});
exports.ping = ping;
