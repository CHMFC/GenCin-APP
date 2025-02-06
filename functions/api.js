const URL = "http://172.233.24.207:8080/api/v1";

export async function login(user, senha) {

    try {
        const urlLogin = `${URL}/usuario/login?user=${encodeURIComponent(user)}&senha=${encodeURIComponent(senha)}`;

        const resposta = await fetch(urlLogin, {method: "GET",});

        if(!resposta.ok) {
            throw new Error(`Error no login: ${resposta.text}`);
        }

        return await resposta.text();
    } catch (error) {
        console.error("Error na função de Login", error);
        throw error;
    }
    
}

export async function getInfo(keySessao) {
    try {

      const url = `${URL}/usuario/getinfo?keySessao=${encodeURIComponent(
        keySessao
      )}`;
  
      const response = await fetch(url, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao obter informações: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro na função getInfo:", error);
      throw error;
    }
  }