# EducAqui

## Introdução 

Aplicativo para fornecer aulas particulares de maneira prática e ágil para um aluno

## Instalando Requisitos

### NodeJS

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Ionic

```bash
sudo npm install -g cordova
sudo npm install -g ionic
sudo npm install -g bower
sudo bower install 
```

### Módulos de teste

```bash
sudo npm install karma --save-dev
sudo npm install karma-jasmine --save-dev
sudo npm install karma-phantomjs-launcher --save-dev
sudo npm install -g karma-cli
sudo npm install -g phantomjs
```

## Rodando o sistema

### Em ambiente de desenvolvimento

```bash
ionic serve
```

### Exportando para o celular

#### Ambiente Android

```bash
ionic platform add android
ionic build android
ionic emulate android
```

#### Ambiente iOS

```bash
ionic platform add ios
ionic build ios
ionic emulate ios
```

## Rodando testes 

### Testes de unidade

```bash
./run_testes.sh unit
```

### Testes de unidade

```bash
./run_testes.sh e2e
```







