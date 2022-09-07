import { Router } from 'express';
import { addPetPage, createPet, deletePet, editPet, editPetPage, getAllPets, getPetById } from '../controllers/petsController';

const router = Router();


router.get('/', getAllPets);

router.get('/new', addPetPage);
router.post('/new', createPet);

router.get('/edit/:petId', editPetPage);
router.post('/edit/:petId', editPet);

router.post('/delete/:petId', deletePet);


router.get('/:petId', getPetById);

export default router;