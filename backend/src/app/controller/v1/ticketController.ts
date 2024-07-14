import { Request, Response } from "express";
import {  indexTicket, showTicket, storeTicket, updateTicket, destroyTicket } from "../../services/v1/ticketService";
import { validationResult } from "express-validator"; 
import { TicketData } from '../../types/Ticket';
import mongoose from 'mongoose';
import Ticket from "../../model/ticket";

// TODO: I think this part can be simplified. (decorator)
export async function ticketIndex (req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    const tickets = await indexTicket();
    res.send("[Ticket Controller]: ticketIndex is called.");
    // throw the error
}

export async function ticketShow (req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    res.send("[Ticket Controller]: ticketShow is called.");
    const { id } = req.params;
    try {
        const result = await showTicket(id, req.body);
        if (result && result.success) {
          return res.status(200).json({ message: result.message, ticket: result.ticketToShow });
        } else {
          return res.status(404).json({ message: result ? result.message : 'Ticket not found'});
        }
    } catch (error:any) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export function ticketStore (req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    res.send("[Ticket Controller]: ticketStore is called.");
    storeTicket(req.body);
}

/**
 * Updates a ticket by its ID.
 * 
 * @param id - The ID of the ticket to update.
 * @param updateData - The data to update the ticket with.
 * @returns The updated ticket or null if not found.
 */

export async function ticketUpdate (req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    } // middleware
    const { id } = req.params;
    try {
        const result = await updateTicket(id, req.body);
        if (result.success) {
          return res.status(200).json({ message: result.message, ticket: result.ticket });
        } else {
          return res.status(404).json({ message: result.message });
        }
        //throw
    } catch (error:any) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export function ticketDestroy (req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    const result = destroyTicket();
    res.send(result);
}

export default { ticketIndex, ticketShow, ticketStore, ticketUpdate, ticketDestroy };