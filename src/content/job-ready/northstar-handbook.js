/**
 * Northstar Handbook — company reference for the Library.
 */
import {
  NORTHSTAR_PROFILE,
  northstarTables,
  northstarKpis,
} from './northstar-profile.js';

function article(id, title, sections) {
  return { id, title, sections };
}

function section(heading, body) {
  return { heading, body };
}

export const northstarHandbook = [
  article('handbook-overview', 'Company Overview', [
    section('About Northstar Commerce', NORTHSTAR_PROFILE.overview),
    section('Mission', NORTHSTAR_PROFILE.mission),
    section('Industry', `${NORTHSTAR_PROFILE.industry} · Founded ${NORTHSTAR_PROFILE.founded} · ${NORTHSTAR_PROFILE.employees} employees`),
    section('Headquarters', NORTHSTAR_PROFILE.headquarters),
    section('Business Goals', NORTHSTAR_PROFILE.businessGoals.map((g) => `• ${g}`).join('\n')),
  ]),
  article('handbook-departments', 'Departments', [
    section('Analytics & Operations Teams', NORTHSTAR_PROFILE.departments.map((d) =>
      `**${d.name}** — ${d.focus}`,
    ).join('\n\n')),
  ]),
  article('handbook-org-chart', 'Organization Chart', [
    section('Executive Leadership', NORTHSTAR_PROFILE.executiveLeadership.map((e) =>
      `**${e.title}** — ${e.name} (${e.department})`,
    ).join('\n\n')),
    section('Your Role', `As a **${NORTHSTAR_PROFILE.learnerRole}**, you report into the analytics organization and support requests from Sales, Marketing, Finance, Operations, and Support.`),
  ]),
  article('handbook-products', 'Product Catalog', [
    section('Categories', NORTHSTAR_PROFILE.productCategories.map((c) => `• ${c}`).join('\n')),
    section('Sample Products', 'Desk Organizer, LED Desk Lamp, Ergonomic Chair, Wireless Keyboard, Notebook Set, Monitor Stand, USB-C Hub, Standing Mat'),
  ]),
  article('handbook-segments', 'Customer Segments', [
    section('Segments', NORTHSTAR_PROFILE.customerSegments.map((s) => `• **${s}** — Northstar customers grouped by purchase behavior and service level`).join('\n')),
    section('Regions', NORTHSTAR_PROFILE.regionalOffices.map((o) => `• **${o.region}** — ${o.city}`).join('\n')),
  ]),
  article('handbook-offices', 'Regional Offices', [
    section('Locations', NORTHSTAR_PROFILE.regionalOffices.map((o) =>
      `**${o.region}** (${o.city}) — ${o.role}`,
    ).join('\n\n')),
  ]),
  article('handbook-channels', 'Sales Channels', [
    section('Channels', NORTHSTAR_PROFILE.salesChannels.map((c) => `• ${c}`).join('\n')),
    section('Note', 'Orders are tagged by channel in the orders table for mix analysis.'),
  ]),
  article('handbook-data-dictionary', 'Data Dictionary', [
    section('Core Tables', Object.entries(northstarTables).map(([table, cols]) =>
      `**${table}** — ${cols}`,
    ).join('\n\n')),
  ]),
  article('handbook-schema', 'Database Schema', [
    section('Relationships', [
      'customers (1) → (*) orders on customer_id',
      'orders (1) → (*) order_items on order_id',
      'products (1) → (*) order_items on product_id',
      'customers (1) → (*) support_tickets on customer_id',
    ].join('\n')),
    section('Revenue Calculation', 'Revenue = SUM(order_items.quantity × order_items.unit_price) joined through orders to customers for regional filters.'),
  ]),
  article('handbook-kpis', 'KPI Definitions', [
    section('Standard Metrics', northstarKpis.map((k) =>
      `**${k.name}** — ${k.definition}`,
    ).join('\n\n')),
  ]),
];

export function getHandbookArticle(id) {
  return northstarHandbook.find((a) => a.id === id);
}
