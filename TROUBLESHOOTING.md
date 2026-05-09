# Troubleshooting Guide

## 404 Not Found Error

### Check 1: Is the Backend Running?

**Open a terminal and check:**

```bash
# Check if Flask is running
curl http://localhost:5000/api/health
```

Or open in browser: `http://localhost:5000/api/health`

**Expected response:** `{"status":"ok"}`

**If you get connection error:**
1. Make sure you're in the `backend` folder
2. Activate virtual environment: `venv\Scripts\activate`
3. Run: `python app.py`
4. You should see: `Running on http://127.0.0.1:5000`

### Check 2: Frontend API Configuration

The frontend uses API endpoints from `frontend/src/config/api.js`. 

**Default configuration:**
- Development: Uses `http://localhost:5000` directly
- Or uses Vite proxy (if configured)

**To test backend connection:**
1. Open browser console (F12)
2. Check Network tab for failed requests
3. Look for the exact URL that's failing

### Check 3: CORS Issues

If you see CORS errors in console:
- Make sure `flask-cors` is installed: `pip install flask-cors`
- Backend should have CORS enabled (already configured in `app.py`)

### Check 4: Port Conflicts

**Backend (Port 5000):**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

**Frontend (Port 3000):**
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

If ports are in use:
- Kill the process using the port, OR
- Change ports in:
  - Backend: `app.py` (last line: `app.run(port=5001)`)
  - Frontend: `vite.config.js` (change port: 3001)

### Check 5: Firewall/Antivirus

Sometimes Windows Firewall blocks localhost connections:
- Temporarily disable firewall to test
- Or add exceptions for Python and Node.js

### Quick Fix Steps

1. **Stop both servers** (Ctrl+C in both terminals)

2. **Start Backend:**
```bash
cd backend
venv\Scripts\activate
python app.py
```
Wait for: `Running on http://127.0.0.1:5000`

3. **Start Frontend (new terminal):**
```bash
cd frontend
npm run dev
```
Wait for: `Local: http://localhost:3000`

4. **Test Backend directly:**
Open browser: `http://localhost:5000/api/health`
Should show: `{"status":"ok"}`

5. **Test Frontend:**
Open browser: `http://localhost:3000`

### Common Error Messages

**"Network Error" or "ERR_CONNECTION_REFUSED"**
- Backend is not running
- Start backend server first

**"404 Not Found"**
- Backend is running but endpoint doesn't exist
- Check backend terminal for error messages
- Verify API endpoint URLs in `frontend/src/config/api.js`

**"CORS policy" error**
- Backend CORS not configured properly
- Make sure `flask-cors` is installed and imported

**"ModuleNotFoundError: No module named 'flask'"**
- Dependencies not installed
- Run: `pip install -r requirements.txt` in backend folder

### Still Not Working?

1. Check browser console (F12) for exact error
2. Check backend terminal for error messages
3. Verify both servers are running on correct ports
4. Try accessing backend directly: `http://localhost:5000/api/health`

