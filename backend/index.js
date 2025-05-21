const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Moto = sequelize.define('Moto', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cilindrada: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const motosData = [
  { marca: "Honda", modelo: "CBR600RR", cilindrada: "600cc", tipo: "Deportiva" },
  { marca: "Yamaha", modelo: "YZF-R6", cilindrada: "600cc", tipo: "Deportiva" },
  { marca: "Suzuki", modelo: "GSX-R750", cilindrada: "750cc", tipo: "Deportiva" },
  { marca: "Kawasaki", modelo: "Ninja ZX-6R", cilindrada: "636cc", tipo: "Deportiva" },
  { marca: "Ducati", modelo: "Panigale V2", cilindrada: "955cc", tipo: "Deportiva" },
  { marca: "BMW", modelo: "S1000RR", cilindrada: "999cc", tipo: "Deportiva" },
  { marca: "Aprilia", modelo: "RS 660", cilindrada: "660cc", tipo: "Deportiva" },
  { marca: "Triumph", modelo: "Daytona Moto2 765", cilindrada: "765cc", tipo: "Deportiva" },
  { marca: "MV Agusta", modelo: "F3 800", cilindrada: "798cc", tipo: "Deportiva" },
  { marca: "KTM", modelo: "RC 390", cilindrada: "373cc", tipo: "Deportiva" },
  { marca: "Honda", modelo: "CB500F", cilindrada: "471cc", tipo: "Naked" },
  { marca: "Yamaha", modelo: "MT-07", cilindrada: "689cc", tipo: "Naked" },
  { marca: "Suzuki", modelo: "SV650", cilindrada: "645cc", tipo: "Naked" },
  { marca: "Kawasaki", modelo: "Z650", cilindrada: "649cc", tipo: "Naked" },
  { marca: "Ducati", modelo: "Monster 797", cilindrada: "803cc", tipo: "Naked" },
  { marca: "BMW", modelo: "F 900 R", cilindrada: "895cc", tipo: "Naked" },
  { marca: "Triumph", modelo: "Trident 660", cilindrada: "660cc", tipo: "Naked" },
  { marca: "KTM", modelo: "Duke 390", cilindrada: "373cc", tipo: "Naked" },
  { marca: "Benelli", modelo: "TNT 600", cilindrada: "600cc", tipo: "Naked" },
  { marca: "CFMOTO", modelo: "NK 650", cilindrada: "649cc", tipo: "Naked" },
  { marca: "Honda", modelo: "CRF250L", cilindrada: "250cc", tipo: "Enduro" },
  { marca: "Yamaha", modelo: "WR250R", cilindrada: "250cc", tipo: "Enduro" },
  { marca: "Kawasaki", modelo: "KLX250", cilindrada: "250cc", tipo: "Enduro" },
  { marca: "Suzuki", modelo: "DR-Z400S", cilindrada: "398cc", tipo: "Enduro" },
  { marca: "Beta", modelo: "RR 300", cilindrada: "300cc", tipo: "Enduro" },
  { marca: "KTM", modelo: "EXC 300", cilindrada: "293cc", tipo: "Enduro" },
  { marca: "Husqvarna", modelo: "TE 300i", cilindrada: "293cc", tipo: "Enduro" },
  { marca: "Sherco", modelo: "300 SE-R", cilindrada: "293cc", tipo: "Enduro" },
  { marca: "GasGas", modelo: "EC 300", cilindrada: "293cc", tipo: "Enduro" },
  { marca: "Rieju", modelo: "MR 300", cilindrada: "293cc", tipo: "Enduro" },
  { marca: "Royal Enfield", modelo: "Classic 350", cilindrada: "346cc", tipo: "Clásica" },
  { marca: "Harley-Davidson", modelo: "Iron 883", cilindrada: "883cc", tipo: "Clásica" },
  { marca: "Indian", modelo: "Scout Bobber", cilindrada: "1133cc", tipo: "Clásica" },
  { marca: "Moto Guzzi", modelo: "V7 Stone", cilindrada: "744cc", tipo: "Clásica" },
  { marca: "Triumph", modelo: "Bonneville T100", cilindrada: "900cc", tipo: "Clásica" },
  { marca: "BMW", modelo: "R nineT", cilindrada: "1170cc", tipo: "Clásica" },
  { marca: "Honda", modelo: "CB1100", cilindrada: "1140cc", tipo: "Clásica" },
  { marca: "Ducati", modelo: "Scrambler Icon", cilindrada: "803cc", tipo: "Clásica" },
  { marca: "Yamaha", modelo: "XSR700", cilindrada: "689cc", tipo: "Clásica" },
  { marca: "Kawasaki", modelo: "Z900RS", cilindrada: "948cc", tipo: "Clásica" }
];

sequelize.sync({ force: true }).then(async () => {
  await Moto.bulkCreate(motosData);
  console.log("Base de datos sincronizada y motos precargadas.");
});

app.get('/motos', async (req, res) => {
  const { marca } = req.query;
  let motos;
  if (marca) {
    motos = await Moto.findAll({ where: { marca } });
  } else {
    motos = await Moto.findAll();
  }
  res.json(motos);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

