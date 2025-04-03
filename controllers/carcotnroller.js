const express = require("express")
const Car = require("../model/Cars")

const getallcars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ updatedAt: -1 })
        res.status(200).json(cars)
    }
    catch (err) {
        res.status(400).json({ message: err.message })

    }
}
const getCarbyId = async (req, res) => {
    try {
        const { id } = req.params
        const car = await Car.findById(id)
        res.status(200).json(car)
    }
    catch (err) {
        res.status(400).json({ message: err.message })

    }
}
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const car = await Car.findByIdAndDelete(id)
        res.status(200).json(car)
    }
    catch (err) {
        res.status(400).json({ message: err.message })

    }
}
const updateCar = async (req, res) => {

    try {
        const { id } = req.params
        const car = await Car.findByIdAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json(car)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const createCar = async (req, res) => {
    const { name, model, year } = req.body
    try {
        const car = await Car.create({ name, model, year })
        res.status(200).json(car)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
module.exports = { getallcars, getCarbyId, deleteCar, updateCar, createCar }