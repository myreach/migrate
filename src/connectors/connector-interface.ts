import {MigrationWriteDTO} from "../dto/migration-write";
import {MigrationReadDTO} from "../dto/migration-read";

export interface ConnectorInterface {

    create(migration: MigrationWriteDTO): Promise<void>;
    read(): Promise<MigrationReadDTO[]>;
    delete(id: string): Promise<void>;
    clean(): Promise<void>;

}