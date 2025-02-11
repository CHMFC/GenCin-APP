const URL = "http://172.233.24.207:8080/api/v1";

export async function login(user, senha) {
  try {
    const urlLogin = `${URL}/usuario/login?user=${encodeURIComponent(
      user
    )}&senha=${encodeURIComponent(senha)}`;

    const resposta = await fetch(urlLogin, { method: "GET" });

    if (!resposta.ok) {
      throw new Error(`Error no login: ${resposta.text}`);
    }

    return await resposta.text();
  } catch (error) {
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

export async function logout(chaveSessao) {
  try {
    // Monta a URL para logout utilizando a chave de sessão informada
    const urlLogout = `${URL}/sessao/logout?chaveSessao=${encodeURIComponent(
      chaveSessao
    )}`;

    // Faz a requisição GET para o endpoint de logout
    const response = await fetch(urlLogout, { method: "GET" });

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro no logout: ${response.statusText}`);
    }

    // Retorna a resposta como texto (pode ser alterado para response.json() se a API retornar JSON)
    return await response.text();
  } catch (error) {
    console.error("Erro na função logout:", error);
    throw error;
  }
}

export async function cadastroProfessor(nome, email, senha, departamento) {
  try {
    const urlCadastro = `${URL}/usuario/cadastroprofessor`;

    // Monta o payload com os dados do professor
    const payload = {
      nome,
      email,
      senha,
      departamento,
    };

    // Realiza a requisição POST para o endpoint de cadastro
    const response = await fetch(urlCadastro, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`Erro no cadastro: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
}

export async function cadastroAluno(nome, email, senha, matricula) {
  try {
    const urlCadastroAluno = `${URL}/usuario/cadastroaluno`;

    // Monta o payload com os dados do aluno
    const payload = {
      nome,
      email,
      senha,
      matricula,
    };

    // Realiza a requisição POST para o endpoint de cadastro do aluno
    const response = await fetch(urlCadastroAluno, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Se a resposta não for bem-sucedida, tenta ler o erro retornado no corpo da resposta
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }
    
  } catch (error) {
    console.error("Erro na função cadastroAluno:", error);
    throw error;
  }
}

