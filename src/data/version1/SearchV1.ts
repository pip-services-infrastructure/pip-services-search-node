import { IStringIdentifiable } from 'pip-services3-commons-node';

export class SearchV1 implements IStringIdentifiable {
    public id: string;
    public product_id: string;
    public party_id: string;

    public create_time?: Date;
    public update_time?: Date;
    
    public rating: number;
    public testimonial?: string;
    public full_search?: boolean;    
 
    public helpful_count?: number;
    public abuse_count?: number;
}