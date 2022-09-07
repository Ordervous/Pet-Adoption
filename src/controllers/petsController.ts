import { RequestHandler } from 'express'
import { Pet } from '../models/petModel'

export const defaultPet: RequestHandler = (req, res, next) => {
    res.redirect('/pets')
  }
  
  export const getAllPets: RequestHandler = async (req, res, next) => {
    let petList: Pet[] = await Pet.findAll();
    res.render('allPets', { petList });
  }
  
  export const getPetById: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId
    let petItem: Pet | null = await Pet.findByPk(itemId);
  
    if (petItem) {
        res.render('petDetails', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'pet already adopted' });
    }
  }
  
  export const addPetPage: RequestHandler = (req, res, next) => {
    res.render('addNewPet')
  }
  
  export const createPet: RequestHandler = async (req, res, next) => {
    let newItem: Pet = req.body
    await Pet.create(newItem);
    res.redirect('/pets');
  }
  
  export const editPetPage: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem: Pet | null = await Pet.findOne({
        where: { petId: itemId }
    });
  
    if (petItem) {
        res.render('editPet', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'pet already adopted' });
    }
  }
  
  export const editPet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let updatedItem: Pet = req.body;
  
    let [updated] = await Pet.update(updatedItem, {
        where: { petId: itemId }
    });
  
    if (updated === 1) {
        res.redirect('/pets');
    }
    else {
        res.render('error', { message: 'Pet could not be updated' });
    }
  }
     
  export const deletePet: RequestHandler = async (req, res, next) => {
    let itemId: string = req.params.petId
    let deleted = await Pet.destroy({
      where: { petId: itemId }
  });
  
  if (deleted) {
      res.redirect('/pets')
  }
  else {
      res.status(404).render('error', { message: 'Cannot find pet' });
  }
  }