import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IIdentity } from 'src/models/identity';
import { BaseController } from 'src/common/base.controller';

@Controller('identity')
export class IdentityController extends BaseController<IIdentity> {
    constructor(private readonly indentityService: IdentityService) {
        super(indentityService, 'Identity')
    }
}
