export function findShortestRoute(nodes, edges, startId, endId, { accessibleOnly = false, closedEdgeIds = [] } = {}) {
  if (!nodes.some((node) => node.id === startId) || !nodes.some((node) => node.id === endId)) return null;
  if (startId === endId) return { nodeIds: [startId], edgeIds: [], distance: 0 };
  const blocked = new Set(closedEdgeIds);
  const distance = new Map(nodes.map((node) => [node.id, Infinity]));
  const previous = new Map();
  const remaining = new Set(nodes.map((node) => node.id));
  distance.set(startId, 0);

  while (remaining.size) {
    let current = null;
    let best = Infinity;
    for (const id of remaining) {
      if (distance.get(id) < best) { current = id; best = distance.get(id); }
    }
    if (current === null || !Number.isFinite(best)) break;
    remaining.delete(current);
    if (current === endId) break;
    for (const edge of edges) {
      if (blocked.has(edge.id) || (accessibleOnly && edge.stairs)) continue;
      const neighbor = edge.source === current ? edge.target : edge.target === current ? edge.source : null;
      if (!neighbor || !remaining.has(neighbor) || !(Number(edge.distance) > 0)) continue;
      const next = best + Number(edge.distance);
      if (next < distance.get(neighbor)) {
        distance.set(neighbor, next);
        previous.set(neighbor, { nodeId: current, edgeId: edge.id });
      }
    }
  }
  if (!Number.isFinite(distance.get(endId))) return null;
  const nodeIds = [endId];
  const edgeIds = [];
  let cursor = endId;
  while (cursor !== startId) {
    const step = previous.get(cursor);
    if (!step) return null;
    edgeIds.unshift(step.edgeId);
    cursor = step.nodeId;
    nodeIds.unshift(cursor);
  }
  return { nodeIds, edgeIds, distance: distance.get(endId) };
}

export function populationWithinRadius(points, candidate, radiusKm) {
  const radius = Math.max(0, Number(radiusKm) || 0);
  const covered = points.filter((point) => Math.hypot(Number(point.x) - Number(candidate.x), Number(point.y) - Number(candidate.y)) <= radius);
  const unique = [...new Map(covered.map((point) => [point.id, point])).values()];
  return { pointIds: unique.map((point) => point.id), population: unique.reduce((sum, point) => sum + (Number(point.population) || 0), 0) };
}
