// export default async function decorate(block) {
//   const link = block.querySelector('a');
//   const url = link?.href;
//   if (!url) return;
//   const section = block.closest('.section');
//   const heading = section.querySelector('.default-content-wrapper h2');
//   const subtitle = section.querySelector('.default-content-wrapper h3');
//   heading?.classList.add('title');
//   subtitle?.classList.add('subtitle');
//   const resp = await fetch(url);
//   const json = await resp.json();
//   const fields = json.data;

//   block.innerHTML = '';

//   const wrapper = document.createElement('div');
//   wrapper.className = 'quotes-wrapper';
//   const form = document.createElement('form');
//   form.className = 'quotes-form';

//   fields.forEach((field) => {
//     const {
//       Field, placeholder, Type, Required,

//     } = field;

//     if (Type === 'submit') {
//       const btn = document.createElement('button');
//       btn.type = 'submit';
//       btn.className = 'quotes-button';
//       btn.textContent = placeholder;
//       form.append(btn);
//       return;
//     }

//     const input = document.createElement('input');
//     input.type = Type;
//     input.name = Field;
//     input.id = `quotes-${Field}`;
//     input.className = 'quotes-input';
//     input.placeholder = placeholder || '';
//     if (Required === 'true') input.required = true;

//     form.append(input);
//   });

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = Object.fromEntries(new FormData(form).entries());

//     try {
//       const submitResp = await fetch(url.replace('.json', ''), {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams(data).toString(),
//       });

//       if (submitResp.ok) {
//         form.reset();
//         // eslint-disable-next-line no-alert
//         alert('Submitted successfully!');
//       } else {
//         // eslint-disable-next-line no-alert
//         alert('Something went wrong. Please try again.');
//       }
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error('Quotes form submission failed:', err);
//     }
//   });

//   wrapper.append(form);
//   block.append(wrapper);
// }

export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link?.href;
  if (!url) return;
  const section = block.closest('.section');
  const heading = section.querySelector('.default-content-wrapper h2');
  const subtitle = section.querySelector('.default-content-wrapper h3');
  heading?.classList.add('title');
  subtitle?.classList.add('subtitle');
  const resp = await fetch(url);
  const json = await resp.json();
  const fields = json.data;

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'quotes-wrapper';
  const form = document.createElement('form');
  form.className = 'quotes-form';

  fields.forEach((field) => {
    const {
      Field, placeholder, Type, Required,

    } = field;

    if (Type === 'submit') {
      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.className = 'quotes-button';
      btn.textContent = placeholder;
      form.append(btn);
      return;
    }

    const input = document.createElement('input');
    input.type = Type;
    input.name = Field;
    input.id = `quotes-${Field}`;
    input.className = 'quotes-input';
    input.placeholder = placeholder || '';
    if (Required === 'true') input.required = true;

    form.append(input);
  });

  // ---------- MODAL CREATION ----------
  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'quotes__modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'quotes__modal';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'quotes__modal-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => overlay.remove());

    const thanksMsg = document.createElement('p');
    thanksMsg.className = 'quotes__modal-thanks';
    thanksMsg.textContent = 'Thank you! Your submission has been received.';

    const detailsBtn = document.createElement('button');
    detailsBtn.type = 'button';
    detailsBtn.className = 'quotes__modal-details-btn';
    detailsBtn.textContent = 'Show Details';

    const detailsBox = document.createElement('div');
    detailsBox.className = 'quotes__modal-details';

    detailsBtn.addEventListener('click', () => {
      const isVisible = detailsBox.classList.toggle('quotes__modal-details--visible');
      detailsBtn.textContent = isVisible ? 'Hide Details' : 'Show Details';
    });

    modal.append(closeBtn, thanksMsg, detailsBtn, detailsBox);
    overlay.append(modal);

    // click outside modal closes it
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    return { overlay, detailsBox };
  }

  function showSuccessModal(data) {
    const { overlay, detailsBox } = buildModal();

    // Build one row per field, each with a separate label span and value span
    detailsBox.innerHTML = '';
    Object.entries(data).forEach(([key, value]) => {
      const row = document.createElement('div');
      row.className = 'quotes__modal-detail-row';

      const label = document.createElement('span');
      label.className = 'quotes__modal-detail-label';
      label.textContent = `${key}:`;

      const val = document.createElement('span');
      val.className = 'quotes__modal-detail-value';
      val.textContent = value;

      row.append(label, val);
      detailsBox.append(row);
    });

    document.body.append(overlay);
  }
  // ---------- END MODAL CREATION ----------

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // ============================================
    // TEMP
    // ============================================
    // form.reset();
    // showSuccessModal(data);
    // return;
    // ============================================
    // TEMP BLOCK ENDS HERE
    // ============================================

    // eslint-disable-next-line no-unreachable
    try {
      const submitResp = await fetch(url.replace('.json', ''), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });

      if (submitResp.ok) {
        form.reset();
        showSuccessModal(data);
      } else {
        // eslint-disable-next-line no-alert
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Quotes form submission failed:', err);
    }
  });

  wrapper.append(form);
  block.append(wrapper);
}
