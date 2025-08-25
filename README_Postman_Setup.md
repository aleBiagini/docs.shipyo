# ShipYo API - Guida Postman

Questa cartella contiene una collezione Postman completa per l'API ShipYo con variabili di ambiente per diversi ambienti di sviluppo.

## 📁 File Inclusi

- **`ShipYo_API_Collection.postman_collection.json`** - Collezione completa con tutti gli endpoint
- **`ShipYo_API_Development.postman_environment.json`** - Ambiente di sviluppo
- **`ShipYo_API_Staging.postman_environment.json`** - Ambiente di staging  
- **`ShipYo_API_Production.postman_environment.json`** - Ambiente di produzione

## 🚀 Setup Rapido

### 1. Importazione in Postman

1. Apri Postman
2. Clicca su **Import** 
3. Trascina tutti i file JSON nella finestra di importazione
4. Conferma l'importazione

### 2. Configurazione Environment

Seleziona l'ambiente appropriato dal dropdown in alto a destra di Postman:

#### Development Environment
- Base URL: `https://shipyo.it`
- Valori pre-compilati per testing rapido
- Credenziali di esempio incluse

#### Staging Environment  
- Base URL: `https://staging.shipyo.it`
- Configurazione per ambiente di test

#### Production Environment
- Base URL: `https://shipyo.it`
- Tutte le variabili vuote per sicurezza
- **RICHIEDE** configurazione manuale delle credenziali

### 3. Configurazione Variabili Essenziali

Prima dell'uso, configura queste variabili nell'ambiente selezionato:

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `api_key` | La tua API Key ShipYo | `ak_1234567890abcdef` |
| `user_email` | Email per login | `admin@example.com` |
| `user_password` | Password per login | `password123` |
| `tenant_id` | ID Tenant (obbligatorio in production) | `1` |

## 📋 Struttura della Collezione

### 🔐 Authentication
- **User Login** - Login utente con JWT
- **Generate JWT Token** - Generazione token alternativa
- **Generate Token from API Key** - Token da API Key
- **Request Password Reset** - Richiesta reset password
- **Validate Reset Token** - Validazione token reset
- **Reset Password** - Reset password

### 👥 User Management
- **Get All Users** - Lista utenti paginata
- **Get User by ID** - Dettagli utente specifico
- **Create User** - Creazione nuovo utente
- **Update User** - Aggiornamento utente
- **Delete User** - Eliminazione utente
- **Check Email Uniqueness** - Verifica unicità email

### 🏢 Tenant Management
- **Get All Tenants** - Lista tenant
- **Get Tenant by ID** - Dettagli tenant specifico
- **Create Tenant** - Creazione nuovo tenant
- **Update Tenant** - Aggiornamento tenant
- **Delete Tenant** - Eliminazione tenant

### 🔑 API Key Management
- **Get All API Keys** - Lista API keys
- **Get API Key by ID** - Dettagli API key specifica
- **Create API Key** - Creazione nuova API key
- **Update API Key** - Aggiornamento API key
- **Delete API Key** - Eliminazione API key
- **Get API Key for Tenant** - API key per tenant specifico

### 📋 Getting Started (Flusso Semplificato)
- **1. Get Session Token** - Primo step per autenticazione
- **2. Get Subscription Plans** - Recupero piani disponibili
- **3. Create a Subscription** - Creazione sottoscrizione

## ⚡ Funzionalità Automatiche

### 🔄 Gestione Token Automatica
- I token JWT vengono estratti automaticamente dalle risposte di login
- Memorizzati nelle variabili di ambiente per riutilizzo
- Inclusi automaticamente nelle richieste successive

### 📊 Test Automatici
- Validazione automatica dei codici di stato
- Controllo della struttura delle risposte
- Estrazione automatica di ID da utilizzare in altre richieste

### 🛠️ Pre-request Scripts
- Configurazione automatica delle variabili di paginazione
- Logging per debugging
- Validazione delle variabili richieste

## 🔒 Tipi di Autenticazione

La collezione gestisce automaticamente tre tipi di autenticazione:

- **🌐 Anonymous** - Nessuna autenticazione richiesta
- **🔑 API Key Only** - Solo header `x-api-key`
- **🔒 JWT Protected** - Header `x-api-key` + `Authorization: Bearer`

## 📝 Variabili Disponibili

### Variabili di Base
- `base_url` - URL base dell'API
- `api_key` - Chiave API
- `jwt_token` - Token JWT (auto-popolato)
- `tenant_id` - ID tenant

### Variabili di Paginazione
- `page` - Numero pagina (default: 1)
- `page_size` - Elementi per pagina (default: 10)
- `search_term` - Termine di ricerca

### Variabili Auto-popolate
- `sample_user_id` - ID dal primo utente della lista
- `sample_tenant_id` - ID dal primo tenant della lista
- `created_user_id` - ID dall'utente appena creato
- `subscription_id` - ID dalla sottoscrizione creata

## 🎯 Workflow Consigliato

### Per Sviluppo
1. Usa l'ambiente **Development**
2. Configura `api_key` e credenziali di login
3. Esegui **User Login** o **Generate Token from API Key**
4. Testa gli endpoint desiderati

### Per Production
1. Usa l'ambiente **Production**
2. Configura TUTTE le variabili necessarie
3. Il `tenant_id` è **OBBLIGATORIO** per origin esterni
4. Testa sempre prima in staging

## ⚠️ Note Importanti

### Security
- Le API keys sono marcate come `secret` negli environment
- Non committare mai gli environment con credenziali reali
- Usa variabili separate per ogni ambiente

### Production Specifics
- Il `tenant_id` è obbligatorio per origin esterni in production
- Tutte le variabili sono vuote di default per sicurezza
- Verifica sempre le configurazioni prima dell'uso

### Rate Limiting
- L'API può avere limitazioni di rate
- Controlla gli header `X-RateLimit-*` nelle risposte
- Implementa gestione degli errori appropriata

## 🆘 Troubleshooting

### Errore 401 - Unauthorized
- Verifica che `api_key` sia configurata
- Controlla che il JWT token sia valido
- Per production, assicurati che `tenant_id` sia impostato

### Errore 403 - Forbidden  
- API key non valida o scaduta
- Permessi insufficienti per l'operazione
- Controlla la configurazione dell'API key

### Token Scaduto
- Esegui nuovamente il login
- Il token verrà aggiornato automaticamente
- Riprova l'operazione fallita

## 📞 Supporto

Per supporto tecnico o domande sull'API:
- Consulta la documentazione completa dell'API
- Verifica i log di Postman per errori dettagliati
- Contatta il team di sviluppo per assistenza

## 🔄 Aggiornamenti

Questa collezione è sincronizzata con la documentazione API ufficiale. Per aggiornamenti:
1. Scarica la versione più recente
2. Re-importa in Postman
3. Aggiorna le variabili di ambiente se necessario

---

**Buon testing con l'API ShipYo! 🚀**
