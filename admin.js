// ============================================
// Database
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  fabricante: String,
  categoria: String,
  quantidade: Number,
  valor: Number,
  
});

const Project = mongoose.model("Project", ProjectSchema);

// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

// config
const adminBroOptions = new AdminBro({
	resources: [
    { resource: Project, options: {
      properties: {
        
      },
   }},
  ],
  locale: {
    translations: {
      labels: {
        Project: 'Lista de Produtos'
      }
    }
  },
  rootPath: '/admin'
})



const router = AdminBroExpress.buildRouter(adminBroOptions)


// ============================================
// Server
const express = require("express");
const server = express();

server
  .use(adminBroOptions.options.rootPath, router)

// =============================================
// Run App
const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1/adminbroapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  await server.listen(8282, () => console.log("Server started"));
}

run()