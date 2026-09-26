// export default async function decorate(block) {
//   const link = block.querySelector('a');
//   const url = link?.href;
//   if (!url) return;

//   // Grab the background image you added as a row in the block
//   const img = block.querySelector('img');
//   const imgSrc = img?.src;

//   const resp = await fetch(url);
//   const json = await resp.json();
//   const fields = json.data;

//   block.innerHTML = '';

//   if (imgSrc) {
//     block.style.backgroundImage = `url('${imgSrc}')`;
//   }

//   const wrapper = document.createElement('div');
//   wrapper.className = 'consultant-wrapper';

//   const section = block.closest('.section');
//   const eyebrow = section.querySelector('.default-content-wrapper h3');
//   const st = section.querySelector('.default-content-wrapper h2');

//   if (eyebrow) {
//     eyebrow.className = 'consultant-eyebrow';
//     wrapper.append(eyebrow);
//   }

//   if (st) {
//     st.className = 'consultant-title';
//     wrapper.append(st);
//   }

//   const form = document.createElement('form');
//   form.className = 'consultant-form';

//   const grid = document.createElement('div');
//   grid.className = 'consultant-grid';
//   form.append(grid);

//   fields.forEach((field) => {
//     const {
//       Field, placeholder, Type, Required,
//     } = field;

//     if (Type === 'submit') {
//       const btn = document.createElement('button');
//       btn.type = 'submit';
//       btn.className = 'consultant-button';
//       btn.textContent = placeholder;
//       form.append(btn);
//       return;
//     }

//     let input;
//     if (Type === 'text-area') {
//       input = document.createElement('textarea');
//       input.className = 'consultant-input consultant-input--textarea';
//       form.append(input);
//     } else {
//       input = document.createElement('input');
//       input.type = Type;
//       input.className = 'consultant-input';
//       grid.append(input);
//     }

//     input.name = Field;
//     input.id = `consultant-${Field}`;
//     input.placeholder = placeholder || '';
//     if (Required === 'true') input.required = true;
//   });

//   // ---------- MODAL CREATION ----------
//   function buildModal() {
//     const overlay = document.createElement('div');
//     overlay.className = 'consultant__modal-overlay';

//     const modal = document.createElement('div');
//     modal.className = 'consultant__modal';

//     const closeBtn = document.createElement('button');
//     closeBtn.type = 'button';
//     closeBtn.className = 'consultant__modal-close';
//     closeBtn.textContent = '×';
//     closeBtn.addEventListener('click', () => overlay.remove());

//     const thanksMsg = document.createElement('p');
//     thanksMsg.className = 'consultant__modal-thanks';
//     thanksMsg.textContent = 'Thank you! Your submission has been received.';

//     const detailsBtn = document.createElement('button');
//     detailsBtn.type = 'button';
//     detailsBtn.className = 'consultant__modal-details-btn';
//     detailsBtn.textContent = 'Show Details';

//     const detailsBox = document.createElement('div');
//     detailsBox.className = 'consultant__modal-details';

//     detailsBtn.addEventListener('click', () => {
//       const isVisible = detailsBox.classList.toggle('consultant__modal-details--visible');
//       detailsBtn.textContent = isVisible ? 'Hide Details' : 'Show Details';
//     });

//     modal.append(closeBtn, thanksMsg, detailsBtn, detailsBox);
//     overlay.append(modal);

//     // click outside modal closes it
//     overlay.addEventListener('click', (e) => {
//       if (e.target === overlay) overlay.remove();
//     });

//     return { overlay, detailsBox };
//   }

//   function showSuccessModal(data) {
//     const { overlay, detailsBox } = buildModal();

//     // Build "name:xxx, phno:xxx" style text
//     const detailsText = Object.entries(data)
//       .map(([key, value]) => `${key}:${value}`)
//       .join(', ');

//     detailsBox.textContent = detailsText;

//     document.body.append(overlay);
//   }
//   // ---------- END MODAL CREATION ----------

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = Object.fromEntries(new FormData(form).entries());

//     // ============================================
//     // TEMP: LOCAL TESTING ONLY — REMOVE BEFORE PUSH
//     // Mocks a successful submission so you can see
//     // the modal without a real backend POST.
//     // ============================================
//     form.reset();
//     showSuccessModal(data);
//     return;
//     // ============================================
//     // TEMP BLOCK ENDS HERE
//     // ============================================

//     // eslint-disable-next-line no-unreachable
//     try {
//       const submitResp = await fetch(url.replace('.json', ''), {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams(data).toString(),
//       });

//       if (submitResp.ok) {
//         form.reset();
//         showSuccessModal(data);
//       } else {
//         // eslint-disable-next-line no-alert
//         alert('Something went wrong. Please try again.');
//       }
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error('Consultant form submission failed:', err);
//     }
//   });

//   wrapper.append(form);
//   block.append(wrapper);
// }

export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link?.href;
  if (!url) return;

  // Grab the background image you added as a row in the block
  const img = block.querySelector('img');
  const imgSrc = img?.src;

  const resp = await fetch(url);
  const json = await resp.json();
  const fields = json.data;

  block.innerHTML = '';

  if (imgSrc) {
    block.style.backgroundImage = `url('${imgSrc}')`;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'consultant-wrapper';

  const section = block.closest('.section');
  const eyebrow = section.querySelector('.default-content-wrapper h3');
  const st = section.querySelector('.default-content-wrapper h2');

  if (eyebrow) {
    eyebrow.className = 'consultant-eyebrow';
    wrapper.append(eyebrow);
  }

  if (st) {
    st.className = 'consultant-title';
    wrapper.append(st);
  }

  const form = document.createElement('form');
  form.className = 'consultant-form';

  const grid = document.createElement('div');
  grid.className = 'consultant-grid';
  form.append(grid);

  fields.forEach((field) => {
    const {
      Field, placeholder, Type, Required,
    } = field;

    if (Type === 'submit') {
      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.className = 'consultant-button';
      btn.textContent = placeholder;
      form.append(btn);
      return;
    }

    let input;
    if (Type === 'text-area') {
      input = document.createElement('textarea');
      input.className = 'consultant-input consultant-input--textarea';
      form.append(input);
    } else {
      input = document.createElement('input');
      input.type = Type;
      input.className = 'consultant-input';
      grid.append(input);
    }

    input.name = Field;
    input.id = `consultant-${Field}`;
    input.placeholder = placeholder || '';
    if (Required === 'true') input.required = true;
  });

  // ---------- MODAL CREATION ----------
  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'consultant__modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'consultant__modal';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'consultant__modal-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => overlay.remove());

    const thanksMsg = document.createElement('p');
    thanksMsg.className = 'consultant__modal-thanks';
    thanksMsg.textContent = 'Thank you! Your submission has been received.';

    const detailsBtn = document.createElement('button');
    detailsBtn.type = 'button';
    detailsBtn.className = 'consultant__modal-details-btn';
    detailsBtn.textContent = 'Show Details';

    const detailsBox = document.createElement('div');
    detailsBox.className = 'consultant__modal-details';

    detailsBtn.addEventListener('click', () => {
      const isVisible = detailsBox.classList.toggle('consultant__modal-details--visible');
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
      row.className = 'consultant__modal-detail-row';

      const label = document.createElement('span');
      label.className = 'consultant__modal-detail-label';
      label.textContent = `${key}:`;

      const val = document.createElement('span');
      val.className = 'consultant__modal-detail-value';
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
      console.error('Consultant form submission failed:', err);
    }
  });

  wrapper.append(form);
  block.append(wrapper);
}
