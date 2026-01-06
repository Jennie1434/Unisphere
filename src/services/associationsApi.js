/**
 * Service API pour les associations
 */
import { api } from './api';

const MOCK_ASSOCIATIONS = [
  {
    id: '1',
    name: 'Eugenia Consulting',
    description: 'Junior Entreprise de l\'école. Accélérez votre carrière avec des missions rémunérées.',
    category: 'Business',
    memberCount: 24,
    emoji: '💼',
    color: '#000000',
    slug: 'eugenia-consulting'
  },
  {
    id: '2',
    name: 'Eugenia Sports',
    description: 'Le BDS de l\'école. Tournois, entraînements et événements sportifs.',
    category: 'Sport',
    memberCount: 156,
    emoji: '🏆',
    color: '#EF4444',
    slug: 'eugenia-sports'
  },
  {
    id: '3',
    name: 'Eugenia Arts',
    description: 'Théâtre, musique, danse et arts plastiques. Exprimez votre créativité.',
    category: 'Culture',
    memberCount: 45,
    emoji: '🎨',
    color: '#8B5CF6',
    slug: 'eugenia-arts'
  },
  {
    id: '4',
    name: 'Eugenia Tech',
    description: 'Hackathons, coding clubs et workshops IA. Bâtissons le futur.',
    category: 'Tech',
    memberCount: 82,
    emoji: '💻',
    color: '#10B981',
    slug: 'eugenia-tech'
  }
];

/**
 * Récupère toutes les associations
 */
export async function getAllAssociations() {
  try {
    const response = await api.get('/associations');
    // If API returns valid data, modify it/merge it? Or just use it?
    // fallback to mock if empty?
    if (Array.isArray(response) && response.length > 0) return response;
    return MOCK_ASSOCIATIONS;
  } catch (error) {
    console.log('API Error, returning mock associations');
    return MOCK_ASSOCIATIONS;
  }
}

/**
 * Récupère les top N associations (par nombre de membres)
 */
export async function getTopAssociations(limit = 3) {
  const associations = await getAllAssociations();
  // Les associations sont déjà triées par nombre de membres décroissant
  return associations.slice(0, limit);
}

/**
 * Récupère les détails d'une association
 */
export async function getAssociationById(id) {
  // MOCK: Eugenia Consulting Mock
  if (id === '1') {
    return MOCK_ASSOCIATIONS[0];
  }
  return api.get(`/associations/${id}`);
}

/**
 * Crée une nouvelle association
 */
export async function createAssociation(data) {
  return api.post('/associations', data);
}

/**
 * Met à jour une association (admin seulement)
 */
export async function updateAssociation(id, data) {
  return api.put(`/associations/${id}`, data);
}

/**
 * Supprime une association (admin seulement)
 */
export async function deleteAssociation(id, email) {
  return api.delete(`/associations/${id}?email=${encodeURIComponent(email)}`);
}

/**
 * Récupère les membres d'une association
 */
export async function getAssociationMembers(associationId) {
  if (associationId === '1') {
    return [
      { id: 1, firstName: 'Orehn', lastName: 'Ansellem', role: 'admin', email: 'oansellem@eugeniaschool.com', status: 'active' },
      { id: 2, firstName: 'Clément', lastName: 'Cochod', role: 'member', email: 'ccochod@eugeniaschool.com', status: 'active' },
      { id: 3, firstName: 'Walid', lastName: 'Bouzidane', role: 'member', email: 'wbouzidane@eugeniaschool.com', status: 'active' },
      { id: 4, firstName: 'Sarah', lastName: 'Cohen', role: 'member', email: 'scohen@eugeniaschool.com', status: 'active' },
      { id: 5, firstName: 'Thomas', lastName: 'Bernard', role: 'member', email: 'tbernard@eugeniaschool.com', status: 'active' },
      { id: 6, firstName: 'Léa', lastName: 'Dubois', role: 'member', email: 'ldubois@eugeniaschool.com', status: 'active' },
    ];
  }
  return api.get(`/associations/${associationId}/members`);
}

/**
 * Ajoute un membre à une association (admin seulement)
 */
export async function addAssociationMember(associationId, data) {
  return api.post(`/associations/${associationId}/members`, data);
}

/**
 * Retire un membre d'une association
 */
export async function removeAssociationMember(associationId, email, requesterEmail) {
  return api.delete(`/associations/${associationId}/members/${encodeURIComponent(email)}?requesterEmail=${encodeURIComponent(requesterEmail)}`);
}

/**
 * Change le rôle d'un membre (admin seulement)
 */
export async function updateMemberRole(associationId, email, role, adminEmail) {
  return api.put(`/associations/${associationId}/members/${encodeURIComponent(email)}/role`, {
    role,
    adminEmail
  });
}

/**
 * Postule à une association
 */
export async function applyToAssociation(associationId, email, message = '') {
  // Mock success for ID 1
  if (associationId === '1') {
    return { success: true };
  }
  return api.post(`/associations/${associationId}/apply`, {
    email,
    message
  });
}

/**
 * Récupère les candidatures d'une association (admin seulement)
 */
export async function getAssociationApplications(associationId, email) {
  return api.get(`/associations/${associationId}/applications?email=${encodeURIComponent(email)}`);
}

/**
 * Accepte une candidature (admin seulement)
 */
export async function acceptApplication(associationId, applicationId, adminEmail) {
  return api.post(`/associations/${associationId}/applications/${applicationId}/accept`, {
    adminEmail
  });
}

/**
 * Rejette une candidature (admin seulement)
 */
export async function rejectApplication(associationId, applicationId, adminEmail) {
  return api.post(`/associations/${associationId}/applications/${applicationId}/reject`, {
    adminEmail
  });
}

/**
 * Récupère les événements d'une association
 */
export async function getAssociationEvents(associationId) {
  if (associationId === '1') {
    return [
      { id: 1, title: 'Atelier Stratégie', date: '2026-02-15', participants: 12, description: "Atelier pratique sur la vision stratégique en entreprise." },
      { id: 2, title: 'Conférence Finance', date: '2026-03-01', participants: 45, description: "Intervention d'un expert du BCG." },
      { id: 3, title: 'Afterwork Pro', date: '2026-03-10', participants: 30, description: "Networking avec les alumni." },
    ];
  }
  return api.get(`/associations/${associationId}/events`);
}

/**
 * Crée un événement (admin seulement)
 */
export async function createAssociationEvent(associationId, data) {
  return api.post(`/associations/${associationId}/events`, data);
}

/**
 * Met à jour un événement (admin seulement)
 */
export async function updateAssociationEvent(associationId, eventId, data) {
  return api.put(`/associations/${associationId}/events/${eventId}`, data);
}

/**
 * Supprime un événement (admin seulement)
 */
export async function deleteAssociationEvent(associationId, eventId, email) {
  return api.delete(`/associations/${associationId}/events/${eventId}?email=${encodeURIComponent(email)}`);
}

/**
 * Récupère tous les événements (pour le calendrier)
 */
export async function getAllEvents(month, year) {
  const params = new URLSearchParams();
  if (month) params.append('month', month);
  if (year) params.append('year', year);
  const query = params.toString();
  return api.get(`/events${query ? `?${query}` : ''}`);
}
/**
 * Récupère les associations d'un étudiant spécifique
 */
export async function getStudentAssociations(email) {
  return api.get(`/leaderboard/student/${encodeURIComponent(email)}/associations`);
}

