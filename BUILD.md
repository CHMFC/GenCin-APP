
# BUILD.md

## Como Construir e Executar o GenAPP (React Native)

### Requisitos
- **Node.js**: 16 ou superior.
- **npm** ou **yarn**.
- Ambiente de desenvolvimento React Native configurado:
  - Android Studio para emulação Android.
  - Xcode para emulação iOS (somente em macOS).

### Passos para Construir o Projeto
1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   cd SEU-REPOSITORIO/app
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o Ambiente**:
   - Certifique-se de que o Android Studio ou Xcode esteja corretamente configurado.
   - Para dispositivos físicos, habilite o modo desenvolvedor e depuração USB (Android) ou inscreva-se no programa de desenvolvedor da Apple (iOS).

4. **Inicie o Metro Bundler**:
   ```bash
   npx react-native start
   ```

5. **Execute no Emulador ou Dispositivo**:
   - Para Android:
     ```bash
     npx react-native run-android
     ```
   - Para iOS:
     ```bash
     npx react-native run-ios
     ```

### Dicas de Solução de Problemas
- **Erro de configuração de ambiente**:
  - Consulte a documentação oficial do React Native [aqui](https://reactnative.dev/docs/environment-setup).
- **Erro de versão do Node.js**:
  - Use ferramentas como `nvm` para gerenciar a versão do Node.js.
- **Erro de compilação para Android**:
  - Certifique-se de que o JDK e o Android SDK estejam configurados corretamente no Android Studio.

### Testes
- Execute os testes antes de compilar:
  ```bash
  npm test
  # ou
  yarn test
  ```

Agora você está pronto para construir e executar o GenAPP!

