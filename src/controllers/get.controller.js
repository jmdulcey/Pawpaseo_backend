import User from "../models/user.model.js";
import Walker from "../models/petWalker.model.js";
import Pet from "../models/pets.model.js";
import Establecimiento from "../models/establecimiento.model.js";

export const getUser = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    const userFound = await User.findById(id);
    return res.json({
      userFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const userFound = await User.find();
    return res.json({
      userFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWalker = async (req, res) => {
  try {
    const id = await Walker.findById(req.params.id);
    const walkerFound = await Walker.findById(id);
    return res.json({
      walkerFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWalkers = async (req, res) => {
  try {
    const walkerFound = await Walker.find();
    return res.json({
      walkerFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPet = async (req, res) => {
  try {
    const id = await Pet.findById(req.params.id);
    const petFound = await Pet.findById(id);
    return res.json({
      petFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPets = async (req, res) => {
  try {
    const petFound = await Pet.find();
    return res.json({
      petFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEstablecimiento = async (req, res) => {
  try {
    const id = await Establecimiento.findById(req.params.id);
    const establecimientoFound = await Establecimiento.findById(id);
    return res.json({
      establecimientoFound
      ,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEstablecimientos = async (req, res) => {
  try {
    const establecimientoFound = await Establecimiento.find();
    return res.json({
      establecimientoFound
      ,
    });
  } catch (error) {
    console.log(error);
  }
};