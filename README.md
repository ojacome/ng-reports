# Api Reports Frontend (Angular)

SPA para consultar en tiempo real el **consumo de datos** (WebSocket), el **saldo de USD/minutos** y el **historial de facturas** (REST) de un número telefónico.  
UI responsive con **Bootstrap 5** y despliegue productivo con **Docker + Nginx**.

---

## 🚀 Tecnologías

- **Angular** (standalone components) + **RxJS**
- **Bootstrap 5**
- **WebSocket** → `/ws/usage?phone_number=...`
- **REST API**
  - `GET /api/customers/{phone}/summary`
  - `GET /api/customers/{phone}/billing`
- **Docker** (Node para build, Nginx para servir estáticos)

> Requisitos:  **Docker**.

---

## Comandos a ejecutar


```bash
git clone https://github.com/ojacome/ng-reports.git
cd ng-reports
docker build -t ng-reports .
docker run --rm -p 8080:80 ng-reports
