export const SERVICIOS = [
  {
    id: 'instrumentacion',
    icon: 'stethoscope',
    color: '#4A8FA0',
    punto: 'punto-azul',
    nombre: 'Instrumentación quirúrgica',
    texto:
      'Nuestros instrumentistas acompañan al cirujano dentro del pabellón y se aseguran de que cada implante y cada herramienta estén listos en el momento en que se necesitan.',
    detalles: [
      'Presencia en pabellón durante la cirugía',
      'Coordinación preoperatoria sin costo',
      'Disponibilidad 24/7 para emergencias',
      'Personal certificado',
    ],
    cta: 'Agendar instrumentista',
    mensaje: 'Hola, quiero agendar un instrumentista para una cirugía.',
  },
  {
    id: 'alquiler',
    icon: 'wrench',
    color: '#5A8A40',
    punto: 'punto-verde',
    nombre: 'Alquiler de instrumental quirúrgico',
    texto:
      'Sets de instrumental esterilizados y listos para cirugías programadas. La clínica no tiene que comprar ni mantener instrumental propio para cada especialidad.',
    detalles: [
      'Sets completos por especialidad',
      'Esterilización incluida',
      'Entrega y retiro en su institución',
      'Inventario amplio',
    ],
    cta: 'Consultar sets',
    mensaje: 'Hola, quiero consultar la disponibilidad de sets de instrumental.',
  },
  {
    id: 'pacientes',
    icon: 'clipboard',
    color: '#C87060',
    punto: 'punto-coral',
    nombre: 'Atención directa al paciente',
    texto:
      'Preparamos presupuestos formales para que el paciente los presente ante su seguro, nacional o internacional, y lo acompañamos hasta que la cobertura queda aprobada.',
    detalles: [
      'Presupuesto formal en 24 horas',
      'Códigos para seguros nacionales e internacionales',
      'Asesoría para la autorización de cobertura',
      'Atención por WhatsApp',
    ],
    cta: 'Solicitar presupuesto',
    mensaje: 'Hola, soy paciente y necesito un presupuesto para mi seguro.',
  },
] as const;
