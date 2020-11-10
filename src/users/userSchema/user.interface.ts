export interface UserInfoInter {
    
    username: string;
    password: string;
    cellNo : string;
    mail : string;
    gender : string;
    nationality ?: string;
    role : string;
    CreatedBy: string;
    CreatedAt: string;
    UpdatedBy?: string;
    UpdatedAt?: string;
}