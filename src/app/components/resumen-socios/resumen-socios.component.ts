import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-resumen-socios',
    templateUrl: './resumen-socios.component.html',
    styleUrls: ['./resumen-socios.component.css']
})
export class ResumenSociosComponent implements OnInit {

    // DATOS
    socios: any = []

    establecimientosProduce = [
        { codigo: '1', nombre: 'DON JUAN', ptoinicial: null, produce: 2 },
        { codigo: '2', nombre: 'PAOLETTI BERMEJO', produce: 2 },
        { codigo: '3', nombre: 'MONTE DE AGUA', produce: 10 },
        { codigo: '4', nombre: 'DORADO', ptoinicial: null, produce: 2 },
        { codigo: '5', nombre: 'EL TANITO viejo', ptoinicial: null, produce: 2 },
        { codigo: '6', nombre: 'PAOLETTI SILENCIO', produce: 2 },
        { codigo: '7', nombre: 'LA ESMERALDA', produce: 2 },
        { codigo: '8', nombre: 'PALO BLANCO PAOLETTI', produce: 2 },
        { codigo: '9', nombre: 'DOÑA BLANCO', produce: 2 },
        { codigo: '10', nombre: 'BIASSI', produce: 2 },
        { codigo: '11', nombre: 'MAZOLLA', produce: 2 },
        { codigo: '12', nombre: 'LA VERÓNICA CHICA', produce: 2 },
        { codigo: '13', nombre: 'OCHETTI', produce: 2 },
        { codigo: '14', nombre: 'PAOLETTI RUTA', produce: 2 },
        { codigo: '15', nombre: 'REDONDO MACHADO', produce: 2 },
        { codigo: '17', nombre: 'CUSSIGH', produce: 2 },
        { codigo: '18', nombre: 'YUCHAN', produce: 4 },
        { codigo: '19', nombre: 'LA SEVERA', produce: 4 },
        { codigo: '20', nombre: 'LA TOLOSITA', produce: 4 },
        { codigo: '21', nombre: 'LA 78', produce: 1 },
        { codigo: '22', nombre: 'PALO BLANCO BALENI', produce: 1 },
        { codigo: '23', nombre: 'KOHN', ptoinicial: null, produce: 1 },
        { codigo: '24', nombre: 'LA BRIGUI', produce: 1 },
        { codigo: '25', nombre: 'LA PROVIDENCIA', produce: 2 },
        { codigo: '26', nombre: 'LA BANDERITA (GIONGO)', produce: 2 },
        { codigo: '27', nombre: 'LA YUNTA', produce: 10 },
        { codigo: '28', nombre: 'EL EDEN', produce: 10 },
        { codigo: '29', nombre: 'LAS PIRAMIDES', produce: 10 },
        { codigo: '30', nombre: 'FALA', produce: 2 },
        { codigo: '31', nombre: 'FOGAR', produce: 10 },
        { codigo: '32', nombre: 'VERBECK', produce: 2 },
        { codigo: '33', nombre: 'BOHACEK', produce: 1 },
        { codigo: '34', nombre: 'ANDION', produce: 3 },
        { codigo: '35', nombre: 'SABATE', produce: 2 },
        { codigo: '36', nombre: 'VICTOR', produce: 2 },
        { codigo: '37', nombre: 'VILCHEZ', produce: 2 },
        { codigo: '38', nombre: 'ANGELI', produce: 2 },
        { codigo: '39', nombre: 'CISKA', produce: 2 },
        { codigo: '40', nombre: 'LA NINA', produce: 2 },
        { codigo: '41', nombre: 'ALLENDE', produce: 2 },
        { codigo: '42', nombre: 'La Juanita', produce: 2 },
        { codigo: '43', nombre: 'CASTELO', produce: 10 },
        { codigo: '44', nombre: 'CISKA LEGUIZA', produce: 2 },
        { codigo: '45', nombre: 'LA SEVERA II', produce: 4 },
        { codigo: '46', nombre: 'TANITO', produce: 2 },
        { codigo: '47', nombre: 'JULIETA', produce: 1 },
        { codigo: '48', nombre: 'YUNTA ANA', produce: 1 },
        { codigo: '49', nombre: 'MOSIMAN', produce: 2 },
        { codigo: '50', nombre: 'GARCIA 82', produce: 2 },
        { codigo: '51', nombre: 'LA CALANDRIA', produce: 1 },
        { codigo: '52', nombre: 'MANANTIAL POZO', produce: 2 },
        { codigo: '53', nombre: 'JAWDA', produce: 2 },
        { codigo: '54', nombre: 'La Fé', produce: 10 }
    ]
    spinnerProduccion: Boolean = true;
    spinnerProduccionOrigen: Boolean = true;
    spinnerEstablecimiento: Boolean = true;
    spinnerLotes: Boolean = true;
    spinnerLoteActividad: Boolean = true;
    spinnerDestinos: Boolean = true;

    produccion: any = [];
    produccionOrigen: any = [];
    establecimiento: any = [];;
    lotes: any = [];
    codLoteActividad: any = [];
    destinos: any = [];

    DIC_establecimiento: any = {};
    DIC_codLoteActividad: any = {};
    DIC_lotes: any = {};
    DIC_destinos: any = {};

    DIC_tipo_dest: any = { 1: 'Cliente', 2: 'Silo', 3: 'Acopio' };


    //FILTROS:
    periodo: any = 4;
    cultivo: any = 2;
    kilosSelecc: any = 'kg_neto_dest';

    //PARA OPERACIONES
    dataFiltrada: any = [];
    dataCruda: any = [];
    dataKilos: any = [];
    dataPorCampos: any = {};
    dataTabla: any = [];

    dataLotes: any = []
    dataSilos: any = []

    cols: any = [];
    selectedColumns: any = [];

    //MODIFICACION PARA HACER TABLA RESUMEN:
    dataParaMostrarTabla: any = []

    mostrarDatos = false;

    //graficos
    grafico: any;

    constructor(private comunicacionService: ComunicacionService, private messageService: MessageService) { }

    ngOnInit(): void {

        this.cols = [
            { field: "cod_establecimiento", header: "Cod" },
            { field: "nombre_establecimiento", header: "Nombre" },
            { field: "total_kgs", header: "TOTAL KGS" },
            { field: "lote_cliente", header: "LOTE A CLIENTE" },
            { field: "lote_silo", header: "LOTE A BOLSON" },
            { field: "lote_acopio", header: "LOTE A ACOPIO" },
            { field: "desde_silo", header: "DESDE BOLSON" },
            { field: "diferencia", header: "DIF (a - de bolson)" },
            { field: "porcentaje_diferencia", header: "%" },
        ];
        this.selectedColumns = [
            { field: "cod_establecimiento", header: "Cod" },
            { field: "nombre_establecimiento", header: "Nombre" },
            { field: "total_kgs", header: "TOTAL KGS" },
            { field: "lote_cliente", header: "LOTE A CLIENTE" },
            { field: "lote_acopio", header: "LOTE A ACOPIO" },
            { field: "lote_silo", header: "LOTE A BOLSON" },
            { field: "desde_silo", header: "DESDE BOLSON" },
            { field: "diferencia", header: "DIF (a - de bolson)" },
            { field: "porcentaje_diferencia", header: "%" },
        ];


        this.obtenerTodosProduccion();
        this.obtenerTodosProduccionOrigen();
        this.obtenerTodosEstablecimiento();
        this.obtenerTodosLoteActividad();
        this.obtenerTodosLotes();
        this.obtenerTodosDestinos();

    }


    obtenerTodosProduccion() {
        this.comunicacionService.obtenerTodosProduccion().subscribe(
            (res: any) => {
                this.produccion = [...res]
                this.spinnerProduccion = false;
            },
            (err: any) => {
                console.log(err)
            }
        )
    }
    obtenerTodosProduccionOrigen() {
        this.comunicacionService.obtenerTodosProduccionOrigen().subscribe(
            (res: any) => {
                this.produccionOrigen = [...res]
                this.spinnerProduccionOrigen = false;
            },
            (err: any) => {
                console.log(err)
            }
        )
    }
    obtenerTodosEstablecimiento() {
        this.comunicacionService.obtenerTodosEstablecimiento().subscribe(
            (res: any) => {
                this.DIC_establecimiento = {}
                this.establecimiento = [...res]
                res.map((e: any) => {
                    this.DIC_establecimiento[e.codigo] = e;
                })
                this.spinnerEstablecimiento = false;
            },
            (err: any) => {
                console.log(err)
            }
        )
    }
    obtenerTodosLotes() {
        this.comunicacionService.obtenerTodosLotes().subscribe(
            (res: any) => {
                this.DIC_lotes = {}
                this.lotes = [...res];
                res.map((e: any) => {
                    this.DIC_lotes[e.codigo] = e;
                })
                this.spinnerLotes = false;
            },
            err => {
                console.log(err);
            }
        );
    };
    obtenerTodosLoteActividad() {
        this.comunicacionService.obtenerTodosLoteActividad().subscribe(
            (res: any) => {
                this.DIC_codLoteActividad = {}
                this.codLoteActividad = [...res]
                res.map((e: any) => {
                    this.DIC_codLoteActividad[e.codigo] = e;
                })
                this.spinnerLoteActividad = false;
            },
            (err: any) => {
                console.log(err)
            }
        )
    }
    obtenerTodosDestinos() {
        this.comunicacionService.obtenerTodosDestinos().subscribe(
            (res: any) => {
                this.DIC_destinos = {};
                this.destinos = [...res];
                res.map((e: any) => {
                    this.DIC_destinos[e.codigo] = e;
                })

                this.spinnerDestinos = false;
            },
            err => {
                console.log(err);
            }
        );
    };


    comenzarTratamiento() {

        this.dataFiltrada = [];

        this.dataLotes = [];
        this.dataSilos = [];

        this.socios = [
            {
                id: 1,
                alias: 'PLANJAR',
                grafico_origen: {},
                grafico_tipo_destinos: {},
                grafico_retiros: {},
                data: [],
                dataDestinos: [],
                total_general: 0
            },
            {
                id: 2,
                alias: 'SOCIEDAD',
                grafico_origen: {},
                grafico_tipo_destinos: {},
                grafico_retiros: {},
                data: [],
                dataDestinos: [],
                total_general: 0
            },
            {
                id: 3,
                alias: 'TIJUANA',
                grafico_origen: {},
                grafico_tipo_destinos: {},
                grafico_retiros: {},
                data: [],
                dataDestinos: [],
                total_general: 0
            },
            {
                id: 4,
                alias: 'YAGUA',
                grafico_origen: {},
                grafico_tipo_destinos: {},
                grafico_retiros: {},
                data: [],
                dataDestinos: [],
                total_general: 0
            },
            {
                id: 10,
                alias: 'OTROS',
                grafico_origen: {},
                grafico_tipo_destinos: {},
                grafico_retiros: {},
                data: [],
                dataDestinos: [],
                total_general: 0
            }
        ];

        //filtramos CAMPAÑA y CULTIVO
        this.produccion.map((registro: any) => {
            let coincideCultivo = this.cultivo == registro.AREA;
            let coincidePeriodo = this.periodo == registro.cod_periodo;

            if (coincideCultivo && coincidePeriodo) {
                this.dataFiltrada.push(registro)
            }
        })


        //creamos los Registros desde Lotes y desde Silos
        this.dataFiltrada.map((registro: any) => {

            if (registro.tipo_origen == 'S') { //SILO

                this.dataSilos.push({
                    origen: registro.origen,
                    cultivo: registro.AREA,
                    destino: registro.cod_dest,
                    tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
                    kg_neto_dest: parseFloat(registro.kg_neto_dest),
                    kg_neto_orig: parseFloat(registro.kg_neto_orig)
                })
            }
            if (registro.tipo_origen == 'L') { //LOTE
                this.dataLotes.push({
                    establecimiento: this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento,
                    produce: this.quienProduce(this.DIC_codLoteActividad[registro.cod_lote_actividad].cod_establecimiento),
                    cultivo: registro.AREA,
                    destino: registro.cod_dest,
                    tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
                    kg_neto_dest: parseFloat(registro.kg_neto_dest),
                    kg_neto_orig: parseFloat(registro.kg_neto_orig)
                })
            }
            if (registro.tipo_origen == 'M') { ///MULTIPLE
                var origenes = this.produccionOrigen.filter((e: any) => {
                    return e.id_produccion == registro.id
                })

                //sacar total de kilos origen brutos
                var kilosBrutosOrigen = 0
                origenes.map((e: any) => {
                    kilosBrutosOrigen += parseFloat(e.kg_origen)
                })

                origenes.map((e: any) => {

                    var proporcion = parseFloat(e.kg_origen) / kilosBrutosOrigen

                    if (e.tipo_origen == 'S') {

                        this.dataSilos.push({
                            origen: registro.origen,
                            cultivo: registro.AREA,
                            destino: registro.cod_dest,
                            tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
                            kg_neto_dest: (parseFloat(registro.kg_neto_dest) * proporcion).toFixed(2),
                            kg_neto_orig: (parseFloat(registro.kg_neto_orig) * proporcion).toFixed(2)
                        })
                    }
                    if (e.tipo_origen == 'L') {
                        this.dataLotes.push({
                            establecimiento: this.DIC_codLoteActividad[e.cod_lote_actividad].cod_establecimiento,
                            produce: this.quienProduce(this.DIC_codLoteActividad[e.cod_lote_actividad].cod_establecimiento),
                            cultivo: registro.AREA,
                            destino: registro.cod_dest,
                            tipo_dest: this.DIC_destinos[registro.cod_dest].id_tipo_destino,
                            kg_neto_dest: parseFloat((parseFloat(registro.kg_neto_dest) * proporcion).toFixed(2)),
                            kg_neto_orig: parseFloat((parseFloat(registro.kg_neto_orig) * proporcion).toFixed(2))
                        })
                    }
                })
            }
        })

        //DIVIDIMOS POR PRODUCCION (SOCIO)
        this.socios.map((socio: any) => {
            var produccionSocio = this.dataLotes.filter((e: any) => { return e.produce == socio.id })

            var dataSocio: any = []

            //SEPARAMOS INFORMACION POR CADA ESTABLECIMIENTO DEL SOCIO
            produccionSocio.map((registro: any) => {

                //console.log(parseFloat(registro.kg_neto_orig))
                if (dataSocio.some((e:any) => { return e.establecimiento == registro.establecimiento })) {
                    var dataAgregar = dataSocio.find((e:any) => { return e.establecimiento == registro.establecimiento })
                    dataAgregar.registros.push(registro)
                    dataAgregar.kg_neto_dest += registro.kg_neto_dest
                    dataAgregar.kg_neto_orig += registro.kg_neto_orig

                    dataAgregar.kg_neto_dest_cliente += registro.tipo_dest == 1 ? registro.kg_neto_dest : 0;
                    dataAgregar.kg_neto_orig_cliente += registro.tipo_dest == 1 ? registro.kg_neto_orig : 0;
                    dataAgregar.kg_neto_dest_silo += registro.tipo_dest == 2 ? registro.kg_neto_dest : 0;
                    dataAgregar.kg_neto_orig_silo += registro.tipo_dest == 2 ? registro.kg_neto_orig : 0;
                    dataAgregar.kg_neto_dest_acopio += registro.tipo_dest == 3 ? registro.kg_neto_dest : 0;
                    dataAgregar.kg_neto_orig_acopio += registro.tipo_dest == 3 ? registro.kg_neto_orig : 0;
                    
                } else {
                    dataSocio.push({
                        produce: socio.id,
                        establecimiento: registro.establecimiento,

                        registros: [ registro ],

                        //totales para luego ir sumando
                        kg_neto_dest: registro.kg_neto_dest,
                        kg_neto_orig: registro.kg_neto_orig,
                        
                        kg_neto_dest_cliente: registro.tipo_dest == 1 ? registro.kg_neto_dest : 0,
                        kg_neto_orig_cliente: registro.tipo_dest == 1 ? registro.kg_neto_orig : 0,

                        kg_neto_dest_silo: registro.tipo_dest == 2 ? registro.kg_neto_dest : 0,
                        kg_neto_orig_silo: registro.tipo_dest == 2 ? registro.kg_neto_orig : 0,

                        kg_neto_dest_acopio: registro.tipo_dest == 3 ? registro.kg_neto_dest : 0,
                        kg_neto_orig_acopio: registro.tipo_dest == 3 ? registro.kg_neto_orig : 0
                    })
                }
            })

            //ARMADO DE GRAFICO

            socio.grafico_origen['labels'] = []
            socio.grafico_origen['datasets'] = [{
                type: 'bar',
                label: 'CLIENTE',
                backgroundColor: '#42A5F5',
                data: []
            },{
                type: 'bar',
                label: 'SILO',
                backgroundColor: '#66BB6A',
                data: []
            },{
                type: 'bar',
                label: 'ACOPIO',
                backgroundColor: '#FFA726',
                data: []
            }];

            var total_a_cliente = 0;
            var total_a_silo = 0;
            var total_a_acopio = 0;


            var total_general = 0;

            dataSocio.map((establecimiento:any) => {
                if(this.kilosSelecc == 'kg_neto_dest'){
                    socio.grafico_origen['labels'].push(this.DIC_establecimiento[establecimiento.establecimiento].nombre + ' (' + this.transformarDatoMostrar(establecimiento.kg_neto_dest, 'total_kgs')  + ' kgs)')

                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'CLIENTE'}).data.push(establecimiento.kg_neto_dest_cliente)
                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'SILO'}).data.push(establecimiento.kg_neto_dest_silo)
                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'ACOPIO'}).data.push(establecimiento.kg_neto_dest_acopio)

                    total_a_cliente += establecimiento.kg_neto_dest_cliente
                    total_a_silo += establecimiento.kg_neto_dest_silo
                    total_a_acopio += establecimiento.kg_neto_dest_acopio

                    total_general += establecimiento.kg_neto_dest_cliente
                    total_general += establecimiento.kg_neto_dest_silo
                    total_general += establecimiento.kg_neto_dest_acopio

                } else {
                    socio.grafico_origen['labels'].push(this.DIC_establecimiento[establecimiento.establecimiento].nombre + ' (' + this.transformarDatoMostrar(establecimiento.kg_neto_orig, 'total_ ')  + ' kgs)')

                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'CLIENTE'}).data.push(establecimiento.kg_neto_orig_cliente)
                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'SILO'}).data.push(establecimiento.kg_neto_orig_silo)
                    socio.grafico_origen.datasets.find( (e:any) => {return e.label == 'ACOPIO'}).data.push(establecimiento.kg_neto_orig_acopio)

                    total_a_cliente += establecimiento.kg_neto_orig_cliente
                    total_a_silo += establecimiento.kg_neto_orig_silo
                    total_a_acopio += establecimiento.kg_neto_orig_acopio

                    total_general += establecimiento.kg_neto_orig_cliente
                    total_general += establecimiento.kg_neto_orig_silo
                    total_general += establecimiento.kg_neto_orig_acopio
                }
            })

            socio.grafico_tipo_destinos = {
                labels: ['CLIENTE','SILO','ACOPIO'],
                datasets: [
                    {
                        data: [total_a_cliente, total_a_silo, total_a_acopio],
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A",
                            "#FFA726"
                        ]
                    }
                ]
            };

            socio.total_general = total_general

            socio.data = dataSocio
        })


        //PARTE DE KILOS RETIRADOS

        //relacionar los datos de establecimiento con los silos.
        var origenSilos:any = []
        this.dataLotes.filter((e:any)=>{return e.tipo_dest == '2'}).map((registro:any)=>{
            if(!origenSilos.some((e:any)=>{return e.codigo == registro.destino})){
                origenSilos.push({
                    codigo: registro.destino,
                    produce: registro.produce,
                    establecimiento: registro.establecimiento
                })

                this.dataSilos.filter((f:any)=>{return f.origen == registro.destino}).map((silo:any)=>{
                    silo['produce'] = registro.produce
                    silo['establecimiento'] = registro.establecimiento
                })
            }
        })

        //controlamos que todos los silos tengan una descarga
        if(this.dataSilos.some((e:any) => {return !e.produce})){

            console.groupCollapsed('Registros de silos que no estan Asociados')
            var silosNoCargados:any = []
            this.dataSilos.map((e:any)=>{
                if(!e.produce){
                    console.log(e)
                    if(!silosNoCargados.some((f:any) => {return f == e.origen})){
                        silosNoCargados.push(e.origen)
                    }
                }
            })
            silosNoCargados.map((e:any) => {
                this.messageService.add({severity:'warn', summary: 'SILOS SIN CARGA - ' + this.DIC_destinos[e].nombre, detail: 'Existen algunos silos que nunca fueron cargados desde un lote. Por lo tanto, no se puede asociar al establecimiento 🙁 \nInfo de los registros en consola.'});
            })
            console.warn('### MOTIVOS! Posiblemente estos silos no fueron cargados desde ningun lote')
            console.groupEnd()
        }


        //CREAMOS DATOS COMBINANDO DESDE SILO Y DESDE LOTES.
        var dataRegistrosGenerales = [ ...this.dataSilos]
        this.dataLotes.map((e:any) => {
            if(e.tipo_dest != '2'){
                dataRegistrosGenerales.push(e)
            }
        })


        this.socios.map((socio:any) => {

            var produccionSocio = dataRegistrosGenerales.filter((e: any) => { return e.produce == socio.id })

            var dataDestino: any = []

            //SEPARAMOS INFORMACION POR CADA ESTABLECIMIENTO DEL SOCIO
            produccionSocio.map((registro: any) => {

                if (dataDestino.some((e:any) => { return e.destino == registro.destino })) {
                    var dataAgregar = dataDestino.find((e:any) => { return e.destino == registro.destino })
                    dataAgregar.registros.push(registro)
                    dataAgregar.kg_neto_dest += parseFloat(registro.kg_neto_dest)
                    dataAgregar.kg_neto_orig += parseFloat(registro.kg_neto_orig)
                    
                } else {
                    dataDestino.push({
                        produce: socio.id,
                        establecimiento: registro.establecimiento,

                        registros: [ registro ],
                        destino: registro.destino,

                        //totales para luego ir sumando
                        kg_neto_dest: parseFloat(registro.kg_neto_dest),
                        kg_neto_orig: parseFloat(registro.kg_neto_orig),
                    })
                }
            })

            socio.grafico_retiros['labels'] = []
            socio.grafico_retiros['datasets'] = [{
                type: 'bar',
                label: 'DESTINOS',
                backgroundColor: '#42A5F5',
                data: []
            }];

            dataDestino.map((destino:any) => {
                if(this.kilosSelecc == 'kg_neto_dest'){
                    socio.grafico_retiros['labels'].push(this.DIC_destinos[destino.destino].nombre + ' (' + this.transformarDatoMostrar(destino.kg_neto_dest, 'total_kgs')  + ' kgs)')

                    socio.grafico_retiros.datasets.find( (e:any) => {return e.label == 'DESTINOS'}).data.push(destino.kg_neto_dest)

                } else {
                    socio.grafico_retiros['labels'].push(this.DIC_destinos[destino.destino].nombre + ' (' + this.transformarDatoMostrar(destino.kg_neto_orig, 'total_ ')  + ' kgs)')

                    socio.grafico_retiros.datasets.find( (e:any) => {return e.label == 'DESTINOS'}).data.push(destino.kg_neto_orig)
                }
            })


            socio.dataDestinos = dataDestino
        })


        this.mostrarDatos = true;
    }




























    /* 
    #############################
    ###        HELPERS        ###
    #############################
    */

    transformarDatoMostrar(dato: any, tipo: any) {
        if (tipo == 'tipo_dest') {
            return this.DIC_tipo_dest[dato];
        }
        if (tipo == 'kilos') {
            return dato.toLocaleString('es-AR');
        }

        if (tipo == 'nombreSilo') {
            if (this.dataSilos.some((e: any) => { return e.cod_silo == dato })) {
                return this.dataSilos.find((e: any) => { return e.cod_silo == dato }).nombre
            } else {
                return '[Sin dato]'
            }
        }
        if (tipo == 'kilosCargaSilo') {
            if (this.dataSilos.some((e: any) => { return e.cod_silo == dato })) {
                return this.dataSilos.find((e: any) => { return e.cod_silo == dato }).kg_carga.toLocaleString('es-AR');
            } else {
                return '[Sin dato]'
            }
        }
        if (tipo == 'kilosDescargaSilo') {
            if (this.dataSilos.some((e: any) => { return e.cod_silo == dato })) {
                return this.dataSilos.find((e: any) => { return e.cod_silo == dato }).kg_descarga.toLocaleString('es-AR');
            } else {
                return '[Sin dato]'
            }
        }
        if (tipo == 'kilosDescargaSiloCalculo') {
            if (this.dataSilos.some((e: any) => { return e.cod_silo == dato })) {
                return this.dataSilos.find((e: any) => { return e.cod_silo == dato }).kg_descarga;
            } else {
                return 0
            }
        }
        if (tipo == 'diferenciaSilo') {
            if (this.dataSilos.some((e: any) => { return e.cod_silo == dato })) {
                var datosSilo = this.dataSilos.find((e: any) => { return e.cod_silo == dato })

                var kilos = parseFloat(datosSilo.kg_carga) - parseFloat(datosSilo.kg_descarga);
                var porcentaje = kilos / parseFloat(datosSilo.kg_carga) * 100;

                return `${kilos.toLocaleString('es-AR')}kgs. (${porcentaje.toLocaleString('es-AR')}%)`
            } else {
                return '[Sin dato]'
            }
        }

        if (tipo == 'total_kgs' || tipo == 'lote_silo' || tipo == 'desde_silo' || tipo == 'diferencia' || tipo == 'porcentaje_diferencia' || tipo == 'lote_cliente' || tipo == 'lote_acopio') {
            return dato ? dato.toLocaleString('es-AR') : '-';
        }


        return dato;
    }

    quienProduce(cod_est: any) {
        var establec = this.establecimientosProduce.find((e: any) => { return e.codigo == cod_est })
        return establec?.produce;
    }

}
