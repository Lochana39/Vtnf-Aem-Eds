/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Fetches placeholder values from the site's placeholders JSON or the global cache.
 * Supports both the common AEM placeholder JSON shape and a flat object map.
 * @returns {Promise<Record<string, string>>}
 */
export async function fetchPlaceholders() {
  const cacheKey = 'placeholders';
  window[cacheKey] = window[cacheKey] || {};

  if (window[cacheKey].loaded) {
    return window[cacheKey];
  }

  try {
    const response = await fetch('/placeholders.json');
    if (!response.ok) {
      window[cacheKey].loaded = true;
      return window[cacheKey];
    }

    const data = await response.json();
    const resolved = {};

    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item && typeof item === 'object') {
          const key = item.Key || item.key || item.name || item.label;
          const value = item.Value || item.value || item.text || '';
          if (key) resolved[key] = value;
        }
      });
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) {
        data.data.forEach((item) => {
          if (item && typeof item === 'object') {
            const key = item.Key || item.key || item.name || item.label;
            const value = item.Value || item.value || item.text || '';
            if (key) resolved[key] = value;
          }
        });
      } else {
        Object.assign(resolved, data);
      }
    }

    Object.assign(window[cacheKey], resolved);
  } catch (error) {
    // fallback quietly when placeholders are missing or unavailable
  } finally {
    window[cacheKey].loaded = true;
  }

  return window[cacheKey];
}
