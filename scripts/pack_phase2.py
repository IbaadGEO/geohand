# Packs the phase 2 datasets into small files the app loads (needs numpy and h5py).
#   seafloor age:  Seton et al. (2020), age.2020.1.GTS2012.6m.nc from https://www.earthbyte.org/webdav/ftp/earthbyte/agegrid/2020/Grids/ (CC BY 4.0)
#   tomography:    SEMUCB-WM1 (French & Romanowicz 2014), semucb-2014-ucb-vs-viz-only.r0.1-n4c.nc from the EarthScope EMC, doi:10.17611/dp/emc.2023.semucbwm1.1
# Usage: python scripts/pack_phase2.py path/to/age.nc path/to/semucb.nc
import sys
import h5py
import numpy as np

age_nc, semucb_nc = sys.argv[1], sys.argv[2]

# ---- seafloor age -> public/data/seafloor-age.bin: 180 x 360 Uint8, the CRUST1.0 cell order (rows from 89.5N, columns from 179.5W).
# Value: mean age in Ma of the cell's ocean nodes, rounded, capped at 254; 255 = mostly not ocean crust (under half the nodes have an age).
with h5py.File(age_nc, 'r') as h:
    lat, lon, z = h['lat'][:], h['lon'][:], h['z'][:]
assert lat[0] == -90 and lon[0] == -180 and z.shape == (1801, 3601)
z = z[:1800, :3600].reshape(180, 10, 360, 10)          # node (i, j) is at lat -90 + i/10, lon -180 + j/10: block k covers [-90 + k, -89 + k)
ocean = ~np.isnan(z)
n = ocean.sum(axis=(1, 3))
mean = np.where(n > 0, np.nansum(z, axis=(1, 3)) / np.maximum(n, 1), 0)
cells = np.where(n >= 50, np.minimum(np.round(mean), 254), 255).astype(np.uint8)[::-1]  # flip so row 0 is 89..90N
assert cells.shape == (180, 360)
cells.tofile('public/data/seafloor-age.bin')
print('seafloor-age.bin', cells.size, 'bytes; ocean cells', int((cells < 255).sum()))

# ---- SEMUCB-WM1 equator slice -> public/data/semucb-equator.bin: one row of 360 Int8 per depth (from 80 km down),
# columns at 179.5W .. 179.5E; value = Vs anomaly in 0.1% units against the area-weighted global mean at that depth.
with h5py.File(semucb_nc, 'r') as h:
    depth, la, lo, vs = h['depth'][:], h['latitude'][:], h['longitude'][:], h['vs'][:]
assert not (vs > 9e4).any()
keep = depth >= 80  # the authors say the model's crust values are not interpretable
w = np.cos(np.radians(la))[None, :, None] * np.ones_like(vs)
mean = (vs * w).sum(axis=(1, 2)) / w.sum(axis=(1, 2))
eq = vs[:, np.argmin(np.abs(la)), :]
centres = np.arange(-179.5, 180, 1.0)
rows = [np.interp(centres, lo, eq[k]) for k in range(len(depth))]
dvs = (np.array(rows) - mean[:, None]) / mean[:, None] * 100
out = np.clip(np.round(dvs[keep] * 10), -127, 127).astype(np.int8)
out.tofile('public/data/semucb-equator.bin')
print('semucb-equator.bin', out.size, 'bytes; depths', [int(d) for d in depth[keep]])
