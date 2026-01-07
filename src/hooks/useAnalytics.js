import { useState, useEffect } from 'react';
import { SCHOOL_EMAIL_DOMAINS } from '../constants/routes';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function useAnalytics(filters = {}, school = 'eugenia') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const period = filters.period || '30d';

      console.log('📡 Fetching analytics from:', `${API_URL}/api/analytics/overview?period=${period}`);
      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];

      const [overview, timeline, popularActions, byClass, topStudents, insights, recentActions] = await Promise.all([
        fetch(`${API_URL}/api/analytics/overview?period=${period}&school=${school}`).then(r => {
          if (!r.ok) console.error('API Error:', r.status, r.statusText);
          return r.json();
        }),
        fetch(`${API_URL}/api/analytics/timeline?period=${period}&school=${school}`).then(r => r.json()),
        fetch(`${API_URL}/api/analytics/popular-actions?limit=5&school=${school}`).then(r => r.json()),
        fetch(`${API_URL}/api/analytics/by-class?school=${school}`).then(r => r.json()),
        fetch(`${API_URL}/api/analytics/top-students?limit=10&school=${school}`).then(r => r.json()),
        fetch(`${API_URL}/api/analytics/insights?school=${school}`).then(r => r.json()),
        fetch(`${API_URL}/api/analytics/recent-actions?hours=24&limit=20&school=${school}`).then(r => r.json()),
      ]);

      // Filtrer par école
      const filterBySchool = (items) => {
        if (!Array.isArray(items)) return [];
        return items.filter(item => {
          if (item.email) {
            return item.email.toLowerCase().includes(emailDomain);
          }
          // Pour les données qui n'ont pas d'email direct, on les garde (comme les statistiques agrégées)
          return true;
        });
      };

      // S'assurer que les données sont des tableaux si attendu et filtrées par école
      setData({
        overview,
        timeline: filterBySchool(Array.isArray(timeline) ? timeline : []),
        popularActions: Array.isArray(popularActions) ? popularActions : [], // Ne pas filtrer les actions populaires (données agrégées)
        byClass: Array.isArray(byClass) ? byClass : [], // Ne pas filtrer byClass (données agrégées par classe)
        topStudents: filterBySchool(Array.isArray(topStudents) ? topStudents : []),
        recentActions: filterBySchool(Array.isArray(recentActions) ? recentActions : []),
        insights,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.period, school]);

  return { data, loading, error, refetch: fetchData };
}

