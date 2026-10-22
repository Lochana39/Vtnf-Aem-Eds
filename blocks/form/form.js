const slug = (text) => text.toLowerCase().trim().replace(/\s+/g, '-');
const PLACEHOLDERS = {
  consultant: {
    name: 'Name*',
    email: 'Email*',
    phone: 'Phone*',
    subject: 'Subject*',
    'text-message': 'Text Message*',
  },
  quotes: {
    email: 'email address',
  },
};

const BUTTON_TEXT = {
  consultant: 'Send Message',
  quotes: 'Send',
};

/* 1. Read the single sheet (testsheet.json) */
async function fetchSheet(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) return [];
    const json = await resp.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

/* 2. MODEL: match each row typed on the page with the sheet row (by Field name) */
function buildModel(rows, sheet) {
  return rows
    .map((row) => {
      const [labelCell, typeCell] = [...row.children];
      const label = labelCell?.textContent.trim();
      if (!label) return null;
      const pageType = typeCell?.textContent.trim().toLowerCase();
      const match = sheet.find(
        (s) => (s.Field || '').trim().toLowerCase() === label.toLowerCase(),
      );
      return {
        label,
        name: slug(label),
        // sheet is the master, page value is only the fallback
        type: (match?.Type || pageType || 'text').trim().toLowerCase(),
        required: String(match?.Required).trim().toLowerCase() === 'true',
      };
    })
    .filter(Boolean);
}

/* 3. Build one field from the model */
function createField({
  label, name, type, required,
}, formName) {
  if (type === 'submit') {
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = BUTTON_TEXT[formName] || label;
    return button;
  }

  const id = `${formName}-${name}`;
  const wrapper = document.createElement('div');
  wrapper.className = 'customform-field';
  if (type === 'text-area') wrapper.classList.add('customform-field-wide');

  /* label stays for screen readers, placeholder is what people see */
  const labelEl = document.createElement('label');
  labelEl.htmlFor = id;
  labelEl.textContent = label;

  const input = document.createElement(type === 'text-area' ? 'textarea' : 'input');
  input.id = id;
  input.name = name;
  if (type !== 'text-area') input.type = type === 'name' ? 'text' : type;
  input.required = required;
  input.placeholder = PLACEHOLDERS[formName]?.[name] ?? `${label}${required ? '*' : ''}`;

  wrapper.append(labelEl, input);
  return wrapper;
}

/* 4. Use the picture (consultant only) as background */
function setBackground(block, picRow) {
  const pic = picRow?.querySelector('picture');
  if (!pic) return;
  const src = pic.querySelector('source[type="image/jpeg"]')?.srcset
    || pic.querySelector('img')?.src;
  if (src) {
    block.classList.add('has-bg');
    block.style.setProperty('--form-bg', `url("${src}")`);
  }
}

/* Build the popup: shows a thank-you line and a Show/Hide details toggle */
function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'form-modal-overlay';
  overlay.hidden = true;

  const modal = document.createElement('div');
  modal.className = 'form-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'form-modal-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';

  const message = document.createElement('p');
  message.className = 'form-modal-message';
  message.textContent = 'Thank you! We will contact you soon.';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'form-modal-toggle';
  toggleBtn.textContent = 'Show details';

  const list = document.createElement('div');
  list.className = 'form-modal-list';
  list.hidden = true;

  toggleBtn.addEventListener('click', () => {
    list.hidden = !list.hidden;
    toggleBtn.textContent = list.hidden ? 'Show details' : 'Hide details';
  });

  modal.append(closeBtn, message, toggleBtn, list);
  overlay.append(modal);

  const close = () => { overlay.hidden = true; };
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return {
    overlay,
    show(data, model) {
      list.textContent = '';
      model.forEach(({ label, name, type }) => {
        if (type === 'submit') return;
        const lb = document.createElement('span');
        lb.textContent = label;
        lb.className = 'flabel';
        const dn = document.createElement('span');
        dn.textContent = data[name] || '—';
        dn.className = 'fname';
        list.append(lb, dn);
      });
      list.hidden = true;
      toggleBtn.textContent = 'Show details';
      overlay.hidden = false;
    },
  };
}

export default async function decorate(block) {
  const rows = [...block.children];
  const formName = [...block.classList].find((c) => !['form', 'block'].includes(c)) || 'form';

  const section = block.closest('.section');
  const h3 = section.querySelector('.default-content-wrapper h3');
  const h2 = section.querySelector('.default-content-wrapper h2');
  h3?.classList.add('form-subtext');
  h2?.classList.add('form-title');

  /* find and remove the JSON link row */
  const linkRow = rows.find((r) => r.querySelector('a[href$=".json"]'));
  const jsonPath = linkRow ? new URL(linkRow.querySelector('a').href).pathname : '';

  /* find the image row (only exists in consultant) */
  const picRow = rows.find((r) => r.querySelector('picture'));

  /* remaining rows are the fields you typed */
  const fieldRows = rows.filter((r) => r !== linkRow && r !== picRow);

  const sheet = jsonPath ? await fetchSheet(jsonPath) : [];
  const model = buildModel(fieldRows, sheet);

  /* move h2/h3 from default-content-wrapper into this form */
  const header = document.createElement('div');
  header.className = 'form-header';
  const prev = block.closest('.form-wrapper')?.previousElementSibling;
  if (prev?.classList.contains('default-content-wrapper')) {
    header.append(...prev.children);
    prev.remove();
  }

  /* build the form */
  const form = document.createElement('form');
  form.className = 'customform';
  model.forEach((field) => form.append(createField(field, formName)));

  const modal = createModal();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // TODO: send `data` to your form endpoint here
    // eslint-disable-next-line no-console
    modal.show(data, model);
    form.reset();
  });

  setBackground(block, picRow);

  /* replace the raw table rows with the real form */
  block.textContent = '';
  block.append(header, form, modal.overlay);
}
