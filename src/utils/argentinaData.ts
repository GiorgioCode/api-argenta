// Nombres comunes en Argentina
export const nombres = [
  'Agustín', 'Alberto', 'Alejandro', 'Alexander', 'Alfredo', 'Andrés', 'Antonio',
  'Ariel', 'Augusto', 'Benjamín', 'Bernardo', 'Bruno', 'Carlos', 'César',
  'Claudio', 'Cristian', 'Daniel', 'Darío', 'David', 'Diego', 'Eduardo', 'Emiliano',
  'Emilio', 'Enrique', 'Esteban', 'Fabián', 'Facundo', 'Federico', 'Felipe',
  'Fernando', 'Francisco', 'Gabriel', 'Gastón', 'Germán', 'Gonzalo', 'Gregorio',
  'Guillermo', 'Gustavo', 'Hernán', 'Horacio', 'Hugo', 'Ignacio', 'Javier',
  'Joaquín', 'Jorge', 'José', 'Juan', 'Julián', 'Julio', 'Leandro', 'Lucas',
  'Luciano', 'Luis', 'Manuel', 'Marcelo', 'Marcos', 'Mariano', 'Martín', 'Mateo',
  'Matías', 'Mauricio', 'Maximiliano', 'Miguel', 'Néstor', 'Nicolás', 'Oscar',
  'Pablo', 'Patricio', 'Raúl', 'Ricardo', 'Roberto', 'Rodrigo', 'Rubén', 'Santiago',
  'Sebastián', 'Sergio', 'Thiago', 'Tomás', 'Valentín', 'Vicente', 'Víctor',
  'Adriana', 'Agustina', 'Alejandra', 'Alicia', 'Ana', 'Andrea', 'Antonella',
  'Bárbara', 'Beatriz', 'Brenda', 'Camila', 'Carla', 'Carolina', 'Catalina',
  'Cecilia', 'Celeste', 'Claudia', 'Cristina', 'Daniela', 'Débora', 'Diana',
  'Elena', 'Eliana', 'Elizabeth', 'Erica', 'Estefanía', 'Eva', 'Fernanda',
  'Florencia', 'Gabriela', 'Guadalupe', 'Inés', 'Irene', 'Isabel', 'Jennifer',
  'Jessica', 'Johanna', 'Josefina', 'Juana', 'Julia', 'Julieta', 'Karen', 'Karina',
  'Laura', 'Liliana', 'Lorena', 'Lourdes', 'Lucía', 'Luján', 'Magdalena', 'Marcela',
  'Margarita', 'María', 'Mariana', 'Mariela', 'Marina', 'Marta', 'Martina',
  'Melina', 'Micaela', 'Milagros', 'Mónica', 'Natalia', 'Nora', 'Paola', 'Patricia',
  'Paula', 'Pilar', 'Ramona', 'Raquel', 'Rocío', 'Romina', 'Rosa', 'Rosario',
  'Sandra', 'Silvia', 'Sofía', 'Soledad', 'Sonia', 'Susana', 'Valentina', 'Valeria',
  'Vanesa', 'Verónica', 'Victoria', 'Virginia', 'Yamila'
];

// Apellidos comunes en Argentina
export const apellidos = [
  'Acosta', 'Aguirre', 'Álvarez', 'Benítez', 'Blanco', 'Bravo', 'Bruno',
  'Bustos', 'Cabrera', 'Cáceres', 'Campos', 'Cardozo', 'Carrizo', 'Castillo',
  'Castro', 'Ceballos', 'Chávez', 'Córdoba', 'Correa', 'Díaz', 'Domínguez',
  'Escobar', 'Espinosa', 'Fernández', 'Ferrari', 'Ferreira', 'Ferreyra',
  'Figueroa', 'Flores', 'Franco', 'Gaitán', 'Gallardo', 'García', 'Giménez',
  'Godoy', 'Gómez', 'González', 'Guerra', 'Gutiérrez', 'Hernández', 'Herrera',
  'Ibáñez', 'Jara', 'Juárez', 'Ledesma', 'Leiva', 'López', 'Lucero', 'Luna',
  'Macías', 'Maldonado', 'Mansilla', 'Martínez', 'Medina', 'Méndez', 'Miranda',
  'Molina', 'Morales', 'Moreno', 'Moyano', 'Muñoz', 'Navarro', 'Núñez', 'Ojeda',
  'Olivera', 'Ortega', 'Ortiz', 'Páez', 'Paredes', 'Paz', 'Peralta', 'Pérez',
  'Pereyra', 'Quiroga', 'Ramírez', 'Ramos', 'Ríos', 'Rivera', 'Robledo',
  'Rodríguez', 'Rojas', 'Romano', 'Romero', 'Ruiz', 'Saavedra', 'Salas',
  'Salinas', 'Sánchez', 'Silva', 'Soria', 'Sosa', 'Suárez', 'Torres', 'Valdez',
  'Vargas', 'Vázquez', 'Vega', 'Velázquez', 'Vera', 'Villalba', 'Villarroel'
];

// Códigos de área telefónicos por provincia
export const codigosAreaPorProvincia: { [key: string]: string } = {
  'Buenos Aires': '221',
  'Ciudad Autónoma de Buenos Aires': '11',
  'Córdoba': '351',
  'Santa Fe': '342',
  'Mendoza': '261',
  'Tucumán': '381',
  'Entre Ríos': '343',
  'Salta': '387',
  'Chaco': '362',
  'Corrientes': '379',
  'Santiago del Estero': '385',
  'San Juan': '264',
  'Jujuy': '388',
  'Río Negro': '299',
  'Neuquén': '299',
  'Formosa': '370',
  'Chubut': '280',
  'San Luis': '266',
  'La Pampa': '2954',
  'La Rioja': '380',
  'Catamarca': '383',
  'Santa Cruz': '2966',
  'Tierra del Fuego': '2901',
  'Misiones': '376'
};

// Códigos de área telefónicos por ciudad principal
export const codigosAreaPorCiudad: { [key: string]: string } = {
  // Buenos Aires
  'La Plata': '221',
  'Mar del Plata': '223',
  'Bahía Blanca': '291',
  'Tandil': '249',
  'Olavarría': '2284',
  'Pergamino': '2477',
  'Junín': '236',
  'Necochea': '2262',
  'Azul': '2281',
  'Chivilcoy': '2346',
  
  // CABA
  'Ciudad Autónoma de Buenos Aires': '11',
  
  // Córdoba
  'Córdoba': '351',
  'Río Cuarto': '358',
  'Villa María': '353',
  'San Francisco': '3564',
  'Río Tercero': '3571',
  'Villa Carlos Paz': '3541',
  
  // Santa Fe
  'Santa Fe': '342',
  'Rosario': '341',
  'Venado Tuerto': '3462',
  'Rafaela': '3492',
  'Reconquista': '3482',
  
  // Mendoza
  'Mendoza': '261',
  'San Rafael': '260',
  'San Martín': '263'
};

// Provincias argentinas con sus datos
export const provincias = [
  {
    nombre: 'Buenos Aires',
    ciudades: [
      'La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarría',
      'Pergamino', 'Junín', 'Necochea', 'Azul', 'Chivilcoy'
    ],
    partidos: [
      'La Plata', 'General Pueyrredón', 'Bahía Blanca', 'Tandil', 'Olavarría',
      'Pergamino', 'Junín', 'Necochea', 'Azul', 'Chivilcoy', 'Tigre', 'San Isidro',
      'La Matanza', 'Quilmes', 'Lanús', 'Avellaneda', 'Almirante Brown', 'Morón',
      'Merlo', 'Moreno', 'Pilar', 'Escobar', 'Tres de Febrero', 'San Miguel',
      'Malvinas Argentinas', 'José C. Paz', 'Hurlingham'
    ],
    codigosPostales: ['B1900', 'B7600', 'B8000', 'B7000', 'B7400', 'B2700', 'B6000', 'B7630', 'B7300', 'B6500']
  },
  {
    nombre: 'Ciudad Autónoma de Buenos Aires',
    ciudades: ['Ciudad Autónoma de Buenos Aires'],
    partidos: ['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5', 'Comuna 6', 'Comuna 7', 'Comuna 8', 'Comuna 9', 'Comuna 10', 'Comuna 11', 'Comuna 12', 'Comuna 13', 'Comuna 14', 'Comuna 15'],
    codigosPostales: ['C1000', 'C1001', 'C1002', 'C1003', 'C1004', 'C1005', 'C1006', 'C1007', 'C1008', 'C1009', 'C1010', 'C1011', 'C1012', 'C1013', 'C1014', 'C1015', 'C1016', 'C1017', 'C1018', 'C1019', 'C1020', 'C1021', 'C1022', 'C1023', 'C1024', 'C1025', 'C1026', 'C1027', 'C1028', 'C1029', 'C1030', 'C1031', 'C1032', 'C1033', 'C1034', 'C1035', 'C1036', 'C1037', 'C1038', 'C1039', 'C1040', 'C1041', 'C1042', 'C1043', 'C1044', 'C1045', 'C1046', 'C1047', 'C1048', 'C1049', 'C1050', 'C1051', 'C1052', 'C1053', 'C1054', 'C1055', 'C1056', 'C1057', 'C1058', 'C1059', 'C1060', 'C1061', 'C1062', 'C1063', 'C1064', 'C1065', 'C1066', 'C1067', 'C1068', 'C1069', 'C1070', 'C1071', 'C1072', 'C1073', 'C1074', 'C1075', 'C1076', 'C1077', 'C1078', 'C1079', 'C1080', 'C1081', 'C1082', 'C1083', 'C1084', 'C1085', 'C1086', 'C1087', 'C1088', 'C1089', 'C1090', 'C1091', 'C1092', 'C1093', 'C1094', 'C1095', 'C1096', 'C1097', 'C1098', 'C1099', 'C1100', 'C1101', 'C1102', 'C1103', 'C1104', 'C1105', 'C1106', 'C1107', 'C1108', 'C1109', 'C1110', 'C1111', 'C1112', 'C1113', 'C1114', 'C1115', 'C1116', 'C1117', 'C1118', 'C1119', 'C1120', 'C1121', 'C1122', 'C1123', 'C1124', 'C1125', 'C1126', 'C1127', 'C1128', 'C1129', 'C1130', 'C1131', 'C1132', 'C1133', 'C1134', 'C1135', 'C1136', 'C1137', 'C1138', 'C1139', 'C1140', 'C1141', 'C1142', 'C1143', 'C1144', 'C1145', 'C1146', 'C1147', 'C1148', 'C1149', 'C1150', 'C1151', 'C1152', 'C1153', 'C1154', 'C1155', 'C1156', 'C1157', 'C1158', 'C1159', 'C1160', 'C1161', 'C1162', 'C1163', 'C1164', 'C1165', 'C1166', 'C1167', 'C1168', 'C1169', 'C1170', 'C1171', 'C1172', 'C1173', 'C1174', 'C1175', 'C1176', 'C1177', 'C1178', 'C1179', 'C1180', 'C1181', 'C1182', 'C1183', 'C1184', 'C1185', 'C1186', 'C1187', 'C1188', 'C1189', 'C1190', 'C1191', 'C1192', 'C1193', 'C1194', 'C1195', 'C1196', 'C1197', 'C1198', 'C1199', 'C1200', 'C1201', 'C1202', 'C1203', 'C1204', 'C1205', 'C1206', 'C1207', 'C1208', 'C1209', 'C1210', 'C1211', 'C1212', 'C1213', 'C1214', 'C1215', 'C1216', 'C1217', 'C1218', 'C1219', 'C1220', 'C1221', 'C1222', 'C1223', 'C1224', 'C1225', 'C1226', 'C1227', 'C1228', 'C1229', 'C1230', 'C1231', 'C1232', 'C1233', 'C1234', 'C1235', 'C1236', 'C1237', 'C1238', 'C1239', 'C1240', 'C1241', 'C1242', 'C1243', 'C1244', 'C1245', 'C1246', 'C1247', 'C1248', 'C1249', 'C1250', 'C1251', 'C1252', 'C1253', 'C1254', 'C1255', 'C1256', 'C1257', 'C1258', 'C1259', 'C1260', 'C1261', 'C1262', 'C1263', 'C1264', 'C1265', 'C1266', 'C1267', 'C1268', 'C1269', 'C1270', 'C1271', 'C1272', 'C1273', 'C1274', 'C1275', 'C1276', 'C1277', 'C1278', 'C1279', 'C1280', 'C1281', 'C1282', 'C1283', 'C1284', 'C1285', 'C1286', 'C1287', 'C1288', 'C1289', 'C1290', 'C1291', 'C1292', 'C1293', 'C1294', 'C1295', 'C1296', 'C1297', 'C1298', 'C1299', 'C1406', 'C1407', 'C1408', 'C1409', 'C1410', 'C1411', 'C1412', 'C1413', 'C1414', 'C1415', 'C1416', 'C1417', 'C1418', 'C1419', 'C1420', 'C1421', 'C1422', 'C1423', 'C1424', 'C1425', 'C1426', 'C1427', 'C1428', 'C1429', 'C1430', 'C1431', 'C1432', 'C1433', 'C1434', 'C1435', 'C1436', 'C1437', 'C1438', 'C1439', 'C1440', 'C1441', 'C1442', 'C1443', 'C1444', 'C1445', 'C1446', 'C1447', 'C1448', 'C1449', 'C1450', 'C1451', 'C1452', 'C1453', 'C1454', 'C1455', 'C1456', 'C1457', 'C1458', 'C1459', 'C1460', 'C1461', 'C1462', 'C1463', 'C1464', 'C1465', 'C1466', 'C1467', 'C1468', 'C1469', 'C1470', 'C1471', 'C1472', 'C1473', 'C1474', 'C1475', 'C1476', 'C1477', 'C1478', 'C1479', 'C1480', 'C1481', 'C1482', 'C1483', 'C1484', 'C1485', 'C1486', 'C1487', 'C1488', 'C1489', 'C1490', 'C1491', 'C1492', 'C1493', 'C1494', 'C1495', 'C1496', 'C1497', 'C1498', 'C1499']
  },
  {
    nombre: 'Catamarca',
    ciudades: ['San Fernando del Valle de Catamarca', 'Andalgalá', 'Belén', 'Recreo', 'Tinogasta', 'Santa María', 'Fiambalá', 'Saujil', 'Londres', 'Los Altos'],
    partidos: ['Capital', 'Andalgalá', 'Belén', 'La Paz', 'Tinogasta', 'Santa María', 'Pomán', 'Capayán', 'El Alto', 'Fray Mamerto Esquiú', 'Valle Viejo', 'Ancasti', 'Antofagasta de la Sierra', 'Paclín', 'Santa Rosa', 'Ambato'],
    codigosPostales: ['K4700', 'K4740', 'K4750', 'K4720', 'K5340', 'K4423', 'K5345', 'K5321', 'K4751', 'K4711']
  },
  {
    nombre: 'Chaco',
    ciudades: ['Resistencia', 'Barranqueras', 'Presidencia Roque Sáenz Peña', 'Villa Ángela', 'Charata', 'Machagai', 'Quitilipi', 'Fontana', 'Las Breñas', 'Juan José Castelli'],
    partidos: ['San Fernando', 'Comandante Fernández', 'Mayor Luis Jorge Fontana', 'General Güemes', 'Libertador General San Martín', 'Maipú', 'Chacabuco', 'Nueve de Julio', 'Presidencia de la Plaza', 'Doce de Octubre', 'Independencia', 'Sargento Cabral', '1º de Mayo', 'Bermejo', 'O\'Higgins', 'Veinticinco de Mayo', 'San Lorenzo', 'General Belgrano', 'General Donovan', 'Quitilipi', 'Fray Justo Santa María de Oro', 'Almirante Brown', 'Dos de Abril', 'Libertad', 'Tapenagá'],
    codigosPostales: ['H3500', 'H3503', 'H3700', 'H3540', 'H3730', 'H3534', 'H3530', 'H3502', 'H3722', 'H3705']
  },
  {
    nombre: 'Chubut',
    ciudades: ['Rawson', 'Comodoro Rivadavia', 'Trelew', 'Puerto Madryn', 'Esquel', 'Sarmiento', 'Gaiman', 'Trevelin', 'Lago Puelo', 'El Hoyo'],
    partidos: ['Rawson', 'Escalante', 'Biedma', 'Futaleufú', 'Sarmiento', 'Gaiman', 'Cushamen', 'Florentino Ameghino', 'Gastre', 'Languiñeo', 'Mártires', 'Paso de Indios', 'Río Senguer', 'Tehuelches', 'Telsen'],
    codigosPostales: ['U9103', 'U9000', 'U9100', 'U9120', 'U9200', 'U9020', 'U9105', 'U9203', 'U9211', 'U9213']
  },
  {
    nombre: 'Córdoba',
    ciudades: ['Córdoba', 'Río Cuarto', 'Villa María', 'San Francisco', 'Río Tercero', 'Villa Carlos Paz', 'Río Segundo', 'Jesús María', 'Bell Ville', 'Alta Gracia'],
    partidos: ['Capital', 'Río Cuarto', 'General San Martín', 'San Justo', 'Tercero Arriba', 'Punilla', 'Río Segundo', 'Colón', 'Unión', 'Santa María', 'Juárez Celman', 'Marcos Juárez', 'San Javier', 'General Roca', 'Río Primero', 'Presidente Roque Sáenz Peña', 'Totoral', 'Calamuchita', 'Pocho', 'Cruz del Eje', 'Ischilín', 'Minas', 'Río Seco', 'San Alberto', 'Sobremonte', 'Tulumba'],
    codigosPostales: ['X5000', 'X5800', 'X5900', 'X2400', 'X5850', 'X5152', 'X5960', 'X5220', 'X2550', 'X5186']
  },
  // Continuar con otras provincias...
  {
    nombre: 'Corrientes',
    ciudades: ['Corrientes', 'Goya', 'Mercedes', 'Curuzú Cuatiá', 'Santo Tomé', 'Bella Vista', 'Paso de los Libres', 'Esquina', 'Saladas', 'Monte Caseros'],
    partidos: ['Capital', 'Goya', 'Mercedes', 'Curuzú Cuatiá', 'Santo Tomé', 'Bella Vista', 'Paso de los Libres', 'Esquina', 'Saladas', 'Monte Caseros', 'Ituzaingó', 'Empedrado', 'San Luis del Palmar', 'General Alvear', 'San Martín', 'Lavalle', 'Mburucuyá', 'San Cosme', 'San Miguel', 'Sauce', 'Concepción', 'Itatí', 'Berón de Astrada', 'General Paz', 'San Roque'],
    codigosPostales: ['W3400', 'W3450', 'W3470', 'W3460', 'W3340', 'W3432', 'W3230', 'W3196', 'W3420', 'W3220']
  },
  {
    nombre: 'Entre Ríos',
    ciudades: ['Paraná', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay', 'Gualeguay', 'Victoria', 'Villaguay', 'La Paz', 'Federación', 'Colón'],
    partidos: ['Paraná', 'Concordia', 'Gualeguaychú', 'Uruguay', 'Gualeguay', 'Victoria', 'Villaguay', 'La Paz', 'Federación', 'Colón', 'Diamante', 'Nogoyá', 'Tala', 'Feliciano', 'Federal', 'Islas del Ibicuy', 'San Salvador'],
    codigosPostales: ['E3100', 'E3200', 'E2820', 'E3260', 'E2840', 'E3153', 'E3240', 'E3190', 'E3280', 'E3280']
  }
];

// Marcas y modelos de vehículos
export const vehiculos = [
  {
    marca: 'Volkswagen',
    modelos: ['Gol', 'Polo', 'Golf', 'Vento', 'Amarok', 'Suran', 'Up!', 'Tiguan', 'Passat', 'Scirocco']
  },
  {
    marca: 'Ford',
    modelos: ['Fiesta', 'Focus', 'Ka', 'Ranger', 'EcoSport', 'Mondeo', 'Kuga', 'Mustang', 'Territory', 'F-150']
  },
  {
    marca: 'Chevrolet',
    modelos: ['Corsa', 'Onix', 'Cruze', 'S10', 'Spin', 'Tracker', 'Camaro', 'Prisma', 'Equinox', 'Captiva']
  },
  {
    marca: 'Fiat',
    modelos: ['Palio', 'Uno', 'Cronos', 'Argo', 'Strada', 'Toro', 'Mobi', '500', 'Ducato', 'Siena']
  },
  {
    marca: 'Renault',
    modelos: ['Clio', 'Sandero', 'Logan', 'Duster', 'Kwid', 'Kangoo', 'Captur', 'Fluence', 'Megane', 'Alaskan']
  },
  {
    marca: 'Peugeot',
    modelos: ['208', '308', '408', '2008', '3008', '5008', 'Partner', 'Boxer', 'Expert', '508']
  },
  {
    marca: 'Toyota',
    modelos: ['Corolla', 'Hilux', 'Etios', 'Yaris', 'RAV4', 'SW4', 'Camry', 'Prius', 'Hiace', 'Land Cruiser']
  },
  {
    marca: 'Honda',
    modelos: ['Civic', 'Fit', 'HR-V', 'CR-V', 'City', 'Accord', 'WR-V', 'Pilot', 'Odyssey', 'Ridgeline']
  },
  {
    marca: 'Citroën',
    modelos: ['C3', 'C4', 'C4 Cactus', 'Berlingo', 'Jumpy', 'Jumper', 'DS3', 'DS4', 'DS5', 'DS7']
  },
  {
    marca: 'Mercedes-Benz',
    modelos: ['Clase A', 'Clase C', 'Clase E', 'Clase S', 'GLA', 'GLC', 'GLE', 'Sprinter', 'Vito', 'CLA']
  }
];

// Calles comunes de Argentina
export const calles = [
  'Rivadavia', 'San Martín', 'Belgrano', 'Mitre', 'Sarmiento', 'Urquiza', 'Moreno', 'Perón', 'Brown', 'Roca',
  'Alberdi', 'Avellaneda', 'Colón', 'Independencia', 'Lavalle', 'Mayo', 'Necochea', 'Pellegrini', 'Rondeau', 'Yrigoyen',
  'Las Heras', 'Alvear', 'Paseo Colón', 'Callao', 'Corrientes', 'Córdoba', 'Santa Fe', 'Entre Ríos', 'Chacabuco', 'Balcarce',
  'Alsina', 'Dorrego', 'Gorriti', 'Juncal', 'Laprida', 'Larrea', 'Mansilla', 'Olazábal', 'Pueyrredón', 'Quesada'
];
