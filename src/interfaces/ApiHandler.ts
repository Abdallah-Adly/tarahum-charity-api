import {  RequestHandler } from "express";
import { ApiResponse } from "./ApiResponse";

export type ApiHandler<Req, Res = { id: string }, Params = {}, Query = {}> = RequestHandler<Params, ApiResponse<Res>, Req, Query>;
