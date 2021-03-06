import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Product
{
    id: number;
    name: string;
    handle: string;
    description: string;
    categories: string[];
    tags: string[];
    images: {
        default: boolean,
        id: string,
        url: string,
        type: string
    }[];
   
    //usertable fields
    accountid:number;
    firstname: string;
    lastname:string;    
    emailid:string;
    role:string;
    username:string;
    password:string;
    accountname:string;
    userstatus:string;
    address:string;
    usertype:string;
    phonenumber :number;
    pagetype:string;
    currentAddress:string;
    constructor(product?)
    {
        product = product || {};
        this.id = product.id;
        this.name = product.name || '';
        this.handle = product.handle || FuseUtils.handleize(this.name);
        this.description = product.description || '';
        this.categories = product.categories || [];
        this.tags = product.tags || [];
        this.images = product.images || [];     
        //user details table fields
        this.accountid =product.accountid;
        this.firstname = product.firstname;
        this.lastname = product.firstname;
        this.emailid = product.emailid;
        this.role = product.role;
        this.username = product.username;
        this.password = product.password;
        this.accountname = product.accountname;
        this.address = product.address;
        this.usertype = product.usertype;
        this.userstatus = product.userstatus;
        this.phonenumber = product.phonenumber;
        this.currentAddress = product.currentaddress;
    }

    addCategory(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add category
        if ( value )
        {
            this.categories.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removeCategory(category)
    {
        const index = this.categories.indexOf(category);

        if ( index >= 0 )
        {
            this.categories.splice(index, 1);
        }
    }

    addTag(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removeTag(tag)
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
        }
    }
}
