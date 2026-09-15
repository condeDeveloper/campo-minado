# 💣 Campo Minado

Campo Minado clássico em HTML, CSS e JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/campo-minado/

## Rodar local

```bash
npx serve -l 5186 .
```

## Níveis

| Nível         | Tamanho | Minas |
|---------------|---------|-------|
| Iniciante     | 9×9     | 10    |
| Intermediário | 16×16   | 40    |
| Especialista  | 30×16   | 99    |

## Controles

| Ação                          | Mouse / teclado          | Toque                    |
|-------------------------------|--------------------------|--------------------------|
| Revelar                       | Clique                   | Toque                    |
| Marcar bandeira               | Botão direito ou Ctrl+clique | Toque longo ou modo bandeira |
| Revelar vizinhos (chord)      | Clique em número aberto  | Toque em número aberto   |
| Novo jogo                     | R, F2 ou a carinha       | Carinha                  |
| Modo bandeira                 | F                        | Botão 🚩                 |

## Funcionalidades

- Primeiro clique sempre seguro (a célula e seus vizinhos nunca têm mina)
- Flood fill nas células vazias
- Chord: clique em um número com as bandeiras certas ao redor abre o resto
- Contador de minas, cronômetro e carinha clássica
- Melhor tempo salvo por nível no `localStorage`
- Ao perder, mostra as minas e as bandeiras erradas; ao vencer, marca todas as minas
- Toque longo com vibração no celular

## Estrutura

```
js/config.js    # níveis e constantes
js/board.js     # lógica: minas, revelar, bandeira, chord, vitória
js/timer.js     # cronômetro
js/storage.js   # recordes
js/render.js    # DOM
js/input.js     # mouse, toque longo, botões
js/game.js      # orquestração
```

## Licença

MIT
