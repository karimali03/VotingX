import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import errorHandler from './middlewares/error.handler.js';
import './config/database.js';
import groupDistrictsRoute from './routes/group_districts.route.js';
import usersRoute from './routes/users.route.js';
import electionResultsPerGroupRoute from './routes/election_results_per_group.route.js';
import encryptedCandidatesRoute from './routes/encrypted_candidates.route.js';
import districtsRoute from './routes/districts.route.js';
import electionsRoute from './routes/elections.route.js';
import candidatesRoute from './routes/candidates.route.js';
import electionResultsRoute from './routes/election_results.route.js';
import voteDetailsRoute from './routes/vote_details.route.js';
import locatesRoute from './routes/locates.route.js';
import electionGroupsRoute from './routes/election_groups.route.js';
import authRoute from './routes/auth.route.js';
import locationRoute from './routes/location.route.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Error handling
process.on('unhandledRejection', (err) => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});

// 3rd party Middleware
app.use(helmet()); // Secure HTTP headers
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Use routes
app.use('/api/v1/group-districts', groupDistrictsRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/election-results-per-group', electionResultsPerGroupRoute);
app.use('/api/v1/encrypted-candidates', encryptedCandidatesRoute);
app.use('/api/v1/districts', districtsRoute);
app.use('/api/v1/elections', electionsRoute);
app.use('/api/v1/election-groups', electionGroupsRoute);
app.use('/api/v1/candidates', candidatesRoute);
app.use('/api/v1/election-results', electionResultsRoute);
app.use('/api/v1/vote-details', voteDetailsRoute);
app.use('/api/v1/locates', locatesRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/location', locationRoute);

// error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api/v1`);
});

export default app;
