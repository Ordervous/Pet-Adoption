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
exports.deletePet = exports.editPet = exports.editPetPage = exports.createPet = exports.addPetPage = exports.getPetById = exports.getAllPets = exports.defaultPet = void 0;
const petModel_1 = require("../models/petModel");
const defaultPet = (req, res, next) => {
    res.redirect('/pets');
};
exports.defaultPet = defaultPet;
const getAllPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petList = yield petModel_1.Pet.findAll();
    res.render('allPets', { petList });
});
exports.getAllPets = getAllPets;
const getPetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let petItem = yield petModel_1.Pet.findByPk(itemId);
    if (petItem) {
        res.render('petDetails', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'pet already adopted' });
    }
});
exports.getPetById = getPetById;
const addPetPage = (req, res, next) => {
    res.render('addNewPet');
};
exports.addPetPage = addPetPage;
const createPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newItem = req.body;
    yield petModel_1.Pet.create(newItem);
    res.redirect('/pets');
});
exports.createPet = createPet;
const editPetPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let petItem = yield petModel_1.Pet.findOne({
        where: { petId: itemId }
    });
    if (petItem) {
        res.render('editPet', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'Whoops, you have stepped in some doo doo' });
    }
});
exports.editPetPage = editPetPage;
const editPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let updatedItem = req.body;
    let [updated] = yield petModel_1.Pet.update(updatedItem, {
        where: { petId: itemId }
    });
    if (updated === 1) {
        res.redirect('/pets');
    }
    else {
        res.render('error', { message: 'Pet could not be updated' });
    }
});
exports.editPet = editPet;
const deletePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let itemId = req.params.petId;
    let deleted = yield petModel_1.Pet.destroy({
        where: { petId: itemId }
    });
    if (deleted) {
        res.redirect('/pets');
    }
    else {
        res.status(404).render('error', { message: 'Cannot find pet' });
    }
});
exports.deletePet = deletePet;
