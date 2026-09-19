(() => {
  'use strict';

  const root = document.getElementById('filters');
  const cards = [...document.querySelectorAll('.card')];
  if (!root || !cards.length || root.dataset.tokenBarMounted === '1') return;

  root.dataset.tokenBarMounted = '1';
  root.classList.add('ms-filter-token-root');

  const preferredCats = ['3D','Social Media','Audiovisual','Motion','Campanhas','Produto','IA','E-commerce','Manipulação','Design'];
  const availableCats = new Set(
    cards.flatMap(card =>
      (card.dataset.cats || card.dataset.cat || '')
        .split('|')
        .map(v => v.trim())
        .filter(Boolean)
    )
  );
  const categoryOptions = [
    ...preferredCats.filter(cat => availableCats.has(cat)),
    ...[...availableCats].filter(cat => !preferredCats.includes(cat))
  ].map(v => ({ value: v, label: v }));

  const projectOptions = cards.map(card => ({
    value: card.dataset.projectSlug || card.querySelector('h2')?.textContent?.trim() || '',
    label: card.querySelector('h2')?.textContent?.trim() || card.dataset.projectSlug || 'Projeto'
  })).filter(o => o.value);

  const fields = [
    {
      id: 'category',
      label: 'Categoria',
      operators: [
        { value: 'is', label: 'é', multi: false },
        { value: 'is_not', label: 'não é', multi: false },
        { value: 'is_any', label: 'é qualquer um de', multi: true }
      ],
      options: categoryOptions
    },
    {
      id: 'project',
      label: 'Projeto',
      operators: [
        { value: 'is', label: 'é', multi: false },
        { value: 'is_not', label: 'não é', multi: false }
      ],
      options: projectOptions
    }
  ];

  let filters = [];
  let open = null;
  let popover = null;
  let restoreTarget = null;

  const uid = () =>
    (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'f_' + Math.random().toString(36).slice(2, 9);

  const fieldById = id => fields.find(f => f.id === id);
  const opByValue = (field, value) => field?.operators.find(o => o.value === value);

  function cardCategories(card) {
    return (card.dataset.cats || card.dataset.cat || '')
      .split('|')
      .map(v => v.trim())
      .filter(Boolean);
  }

  function matchesFilter(card, filter) {
    const field = fieldById(filter.field);
    if (!field) return true;

    if (filter.field === 'category') {
      const cats = cardCategories(card);
      if (!filter.values.length) return true;

      if (filter.operator === 'is') return cats.includes(filter.values[0]);
      if (filter.operator === 'is_not') return !cats.includes(filter.values[0]);
      if (filter.operator === 'is_any') return filter.values.some(v => cats.includes(v));
      return true;
    }

    if (filter.field === 'project') {
      const slug = card.dataset.projectSlug || '';
      if (!filter.values.length) return true;
      if (filter.operator === 'is') return slug === filter.values[0];
      if (filter.operator === 'is_not') return slug !== filter.values[0];
      return true;
    }

    return true;
  }

  function applyFilters() {
    cards.forEach(card => {
      card.hidden = !filters.every(filter => matchesFilter(card, filter));
    });
  }

  function summary(filter) {
    const field = fieldById(filter.field);
    if (!filter.values.length) return 'Selecionar…';
    const labels = filter.values.map(v => field?.options.find(o => o.value === v)?.label || v);
    if (labels.length <= 2) return labels.join(', ');
    return labels[0] + ' +' + (labels.length - 1);
  }

  function closePopover({restore=true} = {}) {
    if (popover) popover.remove();
    popover = null;
    open = null;
    if (restore && restoreTarget && document.contains(restoreTarget)) {
      requestAnimationFrame(() => restoreTarget.focus());
    }
    restoreTarget = null;
    root.querySelectorAll('[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded','false'));
  }

  function makeButton(text, className, attrs={}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;
    for (const [k,v] of Object.entries(attrs)) {
      if (v !== undefined && v !== null) button.setAttribute(k, String(v));
    }
    return button;
  }

  function render() {
    closePopover({restore:false});
    root.innerHTML = '';
    root.setAttribute('role','toolbar');
    root.setAttribute('aria-label','Filtros de projetos');

    filters.forEach(filter => {
      const field = fieldById(filter.field);
      const operator = opByValue(field, filter.operator);
      const token = document.createElement('div');
      token.className = 'ms-filter-token';
      token.dataset.filterId = filter.id;

      const fieldBtn = makeButton(field?.label || filter.field, 'ms-filter-segment ms-filter-field', {
        'aria-label': 'Campo: ' + (field?.label || filter.field),
        'aria-haspopup':'listbox',
        'aria-expanded':'false'
      });
      fieldBtn.addEventListener('click', e => openMenu(e.currentTarget, {kind:'field', filterId:filter.id}));

      const opBtn = makeButton(operator?.label || filter.operator, 'ms-filter-segment ms-filter-operator', {
        'aria-label':'Operador: ' + (operator?.label || filter.operator),
        'aria-haspopup':'listbox',
        'aria-expanded':'false'
      });
      opBtn.addEventListener('click', e => openMenu(e.currentTarget, {kind:'operator', filterId:filter.id}));

      const valueBtn = makeButton(summary(filter), 'ms-filter-segment ms-filter-value' + (!filter.values.length ? ' is-empty' : ''), {
        'aria-label':'Valor: ' + summary(filter),
        'aria-haspopup':'listbox',
        'aria-expanded':'false'
      });
      valueBtn.addEventListener('click', e => openMenu(e.currentTarget, {kind:'value', filterId:filter.id}));

      const removeBtn = makeButton('×', 'ms-filter-remove', {
        'aria-label':'Remover filtro ' + (field?.label || filter.field)
      });
      removeBtn.addEventListener('click', () => {
        filters = filters.filter(f => f.id !== filter.id);
        applyFilters();
        render();
      });

      token.append(fieldBtn, divider(), opBtn, divider(), valueBtn, removeBtn);
      root.appendChild(token);
    });

    const addBtn = makeButton(filters.length ? 'Filtro' : 'Filtrar projetos', 'ms-filter-add', {
      'aria-haspopup':'listbox',
      'aria-expanded':'false'
    });
    addBtn.innerHTML = '<span aria-hidden="true">＋</span><span>' + (filters.length ? 'Filtro' : 'Filtrar projetos') + '</span>';
    addBtn.addEventListener('click', e => openMenu(e.currentTarget, {kind:'add'}));
    root.appendChild(addBtn);

    if (filters.length > 1) {
      const clearBtn = makeButton('Limpar', 'ms-filter-clear');
      clearBtn.addEventListener('click', () => {
        filters = [];
        applyFilters();
        render();
      });
      root.appendChild(clearBtn);
    }
  }

  function divider() {
    const span = document.createElement('span');
    span.className = 'ms-filter-divider';
    span.setAttribute('aria-hidden','true');
    return span;
  }

  function positionPopover(anchor, panel) {
    const rect = anchor.getBoundingClientRect();
    const gap = 7;
    const width = panel.offsetWidth || 260;
    const height = panel.offsetHeight || 260;
    let left = rect.left;
    let top = rect.bottom + gap;

    left = Math.min(left, window.innerWidth - width - 10);
    left = Math.max(10, left);
    if (top + height > window.innerHeight - 10) top = rect.top - gap - height;

    panel.style.left = left + 'px';
    panel.style.top = Math.max(10, top) + 'px';
  }

  function openMenu(anchor, state) {
    closePopover({restore:false});
    open = state;
    restoreTarget = anchor;
    anchor.setAttribute('aria-expanded','true');

    const panel = document.createElement('div');
    panel.className = 'ms-filter-popover';
    panel.setAttribute('role','dialog');
    panel.tabIndex = -1;
    document.body.appendChild(panel);
    popover = panel;

    const filter = state.filterId ? filters.find(f => f.id === state.filterId) : null;
    const field = filter ? fieldById(filter.field) : null;

    if (state.kind === 'add' || state.kind === 'field') {
      renderList(panel, fields.map(f => ({value:f.id,label:f.label})), {
        searchable:false,
        selected:[],
        multi:false,
        onPick:value => {
          if (state.kind === 'add') {
            const f = fieldById(value);
            const next = {
              id: uid(),
              field:value,
              operator:f?.operators[0]?.value || 'is',
              values:[]
            };
            filters = [...filters, next];
            applyFilters();
            render();
            requestAnimationFrame(() => {
              const token = root.querySelector('[data-filter-id="'+next.id+'"] .ms-filter-value');
              if (token) openMenu(token,{kind:'value',filterId:next.id});
            });
          } else {
            const f = fieldById(value);
            filters = filters.map(item => item.id === state.filterId ? {
              ...item,
              field:value,
              operator:f?.operators[0]?.value || 'is',
              values:[]
            } : item);
            applyFilters();
            render();
          }
        }
      });
    } else if (state.kind === 'operator' && field && filter) {
      renderList(panel, field.operators.map(o => ({value:o.value,label:o.label})), {
        searchable:false,
        selected:[filter.operator],
        multi:false,
        onPick:value => {
          const op = opByValue(field,value);
          filters = filters.map(item => item.id === filter.id ? {
            ...item,
            operator:value,
            values: op?.multi ? item.values : item.values.slice(0,1)
          } : item);
          applyFilters();
          render();
        }
      });
    } else if (state.kind === 'value' && field && filter) {
      const op = opByValue(field,filter.operator);
      renderList(panel, field.options || [], {
        searchable:true,
        selected:filter.values,
        multi:!!op?.multi,
        onPick:value => {
          filters = filters.map(item => {
            if (item.id !== filter.id) return item;
            if (!op?.multi) return {...item, values:[value]};
            const has = item.values.includes(value);
            return {...item, values: has ? item.values.filter(v => v !== value) : [...item.values,value]};
          });
          applyFilters();
          if (op?.multi) {
            const current = filters.find(f => f.id === filter.id);
            renderList(panel, field.options || [], {
              searchable:true,
              selected:current?.values || [],
              multi:true,
              onPick:arguments.callee
            });
          } else {
            render();
          }
        }
      });
    }

    positionPopover(anchor,panel);
    requestAnimationFrame(() => {
      positionPopover(anchor,panel);
      const target = panel.querySelector('input,button,[tabindex="0"]');
      target?.focus();
    });
  }

  function renderList(panel, items, config) {
    panel.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'ms-filter-list-wrap';

    let query = '';
    let activeIndex = 0;
    let filtered = items.slice();

    const draw = () => {
      list.innerHTML = '';
      filtered.forEach((item,index) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'ms-filter-option' + (index === activeIndex ? ' is-active' : '') + (config.selected.includes(item.value) ? ' is-selected' : '');
        row.setAttribute('role','option');
        row.setAttribute('aria-selected', config.selected.includes(item.value) ? 'true':'false');
        row.innerHTML = (config.multi ? '<span class="ms-check">'+(config.selected.includes(item.value)?'✓':'')+'</span>' : '') + '<span class="ms-option-label"></span>';
        row.querySelector('.ms-option-label').textContent = item.label;
        row.addEventListener('mouseenter',() => {activeIndex=index; draw();});
        row.addEventListener('click',() => config.onPick(item.value));
        list.appendChild(row);
      });
      if (!filtered.length) {
        const empty = document.createElement('div');
        empty.className = 'ms-filter-empty';
        empty.textContent = 'Nenhum resultado';
        list.appendChild(empty);
      }
    };

    if (config.searchable) {
      const searchWrap = document.createElement('div');
      searchWrap.className = 'ms-filter-search-wrap';
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = 'Filtrar…';
      input.className = 'ms-filter-search';
      input.setAttribute('aria-label','Filtrar opções');
      input.addEventListener('input',() => {
        query=input.value.trim().toLowerCase();
        filtered=items.filter(i => i.label.toLowerCase().includes(query));
        activeIndex=0;
        draw();
      });
      input.addEventListener('keydown', e => handleListKey(e));
      searchWrap.appendChild(input);
      wrap.appendChild(searchWrap);
    }

    const list = document.createElement('div');
    list.className = 'ms-filter-options';
    list.setAttribute('role','listbox');
    if (config.multi) list.setAttribute('aria-multiselectable','true');
    list.tabIndex = config.searchable ? -1 : 0;
    list.addEventListener('keydown',e => handleListKey(e));
    wrap.appendChild(list);
    panel.appendChild(wrap);
    draw();

    function handleListKey(e) {
      if (!filtered.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex=Math.min(activeIndex+1,filtered.length-1); draw();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex=Math.max(activeIndex-1,0); draw();
      } else if (e.key === 'Home') {
        e.preventDefault(); activeIndex=0; draw();
      } else if (e.key === 'End') {
        e.preventDefault(); activeIndex=filtered.length-1; draw();
      } else if (e.key === 'Enter') {
        e.preventDefault(); config.onPick(filtered[activeIndex].value);
      } else if (e.key === 'Escape') {
        e.preventDefault(); closePopover();
      }
    }
  }

  document.addEventListener('pointerdown', e => {
    if (!popover) return;
    if (popover.contains(e.target) || restoreTarget?.contains(e.target)) return;
    closePopover();
  }, true);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popover) {
      e.preventDefault();
      closePopover();
    }
  }, true);

  window.addEventListener('resize', () => {
    if (popover && restoreTarget) positionPopover(restoreTarget,popover);
  }, {passive:true});

  window.addEventListener('scroll', () => {
    if (popover && restoreTarget) positionPopover(restoreTarget,popover);
  }, true);

  render();
  applyFilters();

  window.MSProjectFilterBar = {
    get value(){ return filters.map(f => ({...f, values:[...f.values]})); },
    setValue(next){ filters = Array.isArray(next) ? next : []; applyFilters(); render(); },
    clear(){ filters=[]; applyFilters(); render(); }
  };
})();