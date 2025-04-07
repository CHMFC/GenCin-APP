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
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro ao obter informações: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function logout(chaveSessao) {
  try {
    const urlLogout = `${URL}/sessao/logout?chaveSessao=${encodeURIComponent(chaveSessao)}`;
    const response = await fetch(urlLogout, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro no logout: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
}

export async function cadastroProfessor(nome, email, senha, departamento) {
  try {
    const urlCadastro = `${URL}/usuario/cadastroprofessor`;
    const payload = { nome, email, senha, departamento };
    const response = await fetch(urlCadastro, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
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
    const payload = { nome, email, senha, matricula };
    const response = await fetch(urlCadastroAluno, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }
  } catch (error) {
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
      throw new Error("Tipo de usuário inválido. Deve ser 'professor' ou 'aluno'.");
    }
    const response = await fetch(url, { method: "PUT" });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao atualizar dados: ${errorText}`);
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
}

export async function criarAula(keySessao, aula) {
  try {
    const url = `${URL}/aula/criar?keySessao=${encodeURIComponent(keySessao)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aula),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar aula: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function editarAula(keySessao, aulaId, aula) {
  try {
    const url = `${URL}/aula/editar?keySessao=${encodeURIComponent(
      keySessao
    )}&aulaId=${encodeURIComponent(aulaId)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aula),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao editar aula: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function buscarAula(codAula) {
  try {
    const url = `${URL}/aula/buscar?codAula=${encodeURIComponent(codAula)}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro ao buscar aula: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

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
    throw error;
  }
}

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
    throw error;
  }
}

export async function getMinhasTurmas(keySessao) {
  try {
    const url = `${URL}/sessao/getAulas?keySessao=${encodeURIComponent(keySessao)}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro ao obter turmas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function buscarInfoAula(aulaId) {
  const url = `${URL}/aula/info?aulaId=${encodeURIComponent(aulaId)}`;
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error("Erro ao buscar info da aula");
  }
  return response.json(); 
}

export async function criarAtividade(atividade) {
  // Exemplo: POST em /api/v1/atividade/criar
  const url = `${URL}/atividade/criar`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atividade),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao criar atividade: ${errorText}`);
  }
  // Retorna a atividade criada (JSON) que o backend enviou
  return await response.json();
}

export async function buscarAtividadesPorCod(codAula) {
  const url = `${URL}/atividade/cod?codAula=${encodeURIComponent(codAula)}`;
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Erro ao buscar atividades: ${response.statusText}`);
  }
  return await response.json(); // array de Atividade
}


