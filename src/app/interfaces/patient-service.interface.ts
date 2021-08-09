


export interface Patient {
    Oid: number;
    TipoDocumento: string;
    Documento: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    EstadoPaciente: string;
    Sexo: string;
    FechaNaciemiento: Date;
    EstadoCivil: string;
    EntidadAdministradora: string;
}