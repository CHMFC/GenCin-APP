const URL = "http://198.74.53.107:8080/api/v1";

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
  print(keySessao);
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

export async function editarDadosUsuario(tipo, nome, email, senha, extra) {
  try {
    let url = "";
    if (tipo.toLowerCase() === "professor") {
      url = `${URL}/usuario/editardadosprofessor?nome=${encodeURIComponent(
        nome
      )}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(
        senha
      )}&departamento=${encodeURIComponent(extra)}`;
    } else if (tipo.toLowerCase() === "aluno") {
      url = `${URL}/usuario/editardadosaluno?nome=${encodeURIComponent(
        nome
      )}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(
        senha
      )}&matricula=${encodeURIComponent(extra)}`;
    } else {
      throw new Error(
        "Tipo de usuário inválido. Deve ser 'professor' ou 'aluno'."
      );
    }

    const response = await fetch(url, { method: "PUT" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao atualizar dados: ${errorText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error("Erro na função editarDadosUsuario:", error);
    throw error;
  }
}

export async function criarAula(keySessao, aula) {
  try {
    const url = `${URL}/aula/criar?keySessao=${encodeURIComponent(keySessao)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aula),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar aula: ${errorText}`);
    }

    // Retorna o objeto aula criado (em JSON)
    return await response.json();
  } catch (error) {
    console.error("Erro na função criarAula:", error);
    throw error;
  }
}

// Professor edita uma aula (somente se for o dono)
export async function editarAula(keySessao, aulaId, aula) {
  try {
    const url = `${URL}/aula/editar?keySessao=${encodeURIComponent(
      keySessao
    )}&aulaId=${encodeURIComponent(aulaId)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aula),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao editar aula: ${errorText}`);
    }

    // Retorna o objeto aula atualizado
    return await response.json();
  } catch (error) {
    console.error("Erro na função editarAula:", error);
    throw error;
  }
}

// Buscar aulas por código (retorna todas as aulas com o mesmo cod_aula)
export async function buscarAula(codAula) {
  try {
    const url = `${URL}/aula/buscar?codAula=${encodeURIComponent(codAula)}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro ao buscar aula: ${response.statusText}`);
    }

    // Retorna a lista de aulas encontradas
    return await response.json();
  } catch (error) {
    console.error("Erro na função buscarAula:", error);
    throw error;
  }
}

// Aluno adiciona uma aula à sua agenda
export async function adicionarAulaAgenda(keySessao, aulaId) {
  try {
    const url = `${URL}/aula/adicionarAgenda?keySessao=${encodeURIComponent(
      keySessao
    )}&aulaId=${encodeURIComponent(aulaId)}`;
    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao adicionar aula na agenda: ${errorText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Erro na função adicionarAulaAgenda:", error);
    throw error;
  }
}

// Aluno remove uma aula da sua agenda
export async function removerAulaAgenda(keySessao, aulaId) {
  try {
    const url = `${URL}/aula/removerAgenda?keySessao=${encodeURIComponent(
      keySessao
    )}&aulaId=${encodeURIComponent(aulaId)}`;
    const response = await fetch(url, { method: "DELETE" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao remover aula da agenda: ${errorText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Erro na função removerAulaAgenda:", error);
    throw error;
  }
}

export async function getMinhasTurmas(keySessao) {
  try {
    const url = `${URL}/aula/minhas?keySessao=${encodeURIComponent(keySessao)}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro ao obter turmas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na função getMinhasTurmas:", error);
    throw error;
  }
}


