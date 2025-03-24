import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TaskIcon from '@mui/icons-material/Task';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar ';
import Sidebar from '../components/Sidebar';
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from '../services/api';

const priorityOptions = [
  { label: 'High', value: 'HIGH', icon: <PriorityHighIcon color='error' /> },
  {
    label: 'Medium',
    value: 'MEDIUM',
    icon: <ReportProblemIcon color='warning' />,
  },
  { label: 'Low', value: 'LOW', icon: <LowPriorityIcon color='success' /> },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
  });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getTasks = async () => {
      if (!token || !userId) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetchTasks(token, userId);
        setTasks(response.data);
      } catch (error) {
        setError('Error fetching tasks.');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [token, userId]);

  // Open Modal (for Create/Edit)
  const handleOpenModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskData({
        title: task.title,
        description: task.description,
        priority: task.priority,
      });
    } else {
      setEditingTask(null);
      setTaskData({ title: '', description: '', priority: 'MEDIUM' });
    }
    setOpenModal(true);
  };

  // Create or Update Task
  const handleCreateOrUpdateTask = async () => {
    if (!taskData.title.trim() || !taskData.description.trim()) {
      alert('Please fill all fields.');
      return;
    }

    try {
      if (editingTask) {
        // Update Task
        const response = await updateTask(token, editingTask.id, taskData);
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? response.data : task,
          ),
        );
      } else {
        // Create Task
        const response = await createTask(token, userId, taskData);
        setTasks([...tasks, response.data]);
      }
      setOpenModal(false);
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(token, taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Navbar and Sidebar */}
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
       <TaskIcon color="primary" sx={{ mr: 1 }} />
         Your Task Dashboard
      </Typography>


        {/* Add Task Button */}
        <Box display='flex' justifyContent='flex-end' mb={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleOpenModal()}
          >
            ➕ Add New Task
          </Button>
        </Box>

        {/* Task List */}
        {loading ? (
          <Box display='flex' justifyContent='center' mt={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color='error'>{error}</Typography>
        ) : tasks.length === 0 ? (
          <Typography color='textSecondary' sx={{ mt: 3, textAlign: 'center' }}>
            No tasks available. Enjoy your day! 🎉
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 2,
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Box display='flex' alignItems='center' gap={1} mb={1}>
                      <TaskIcon color='primary' />
                      <Typography variant='h6'>{task.title}</Typography>
                    </Box>
                    <Typography variant='body2' color='textSecondary'>
                      {task.description}
                    </Typography>
                    <Chip
                      label={task.priority}
                      icon={
                        priorityOptions.find((p) => p.value === task.priority)
                          ?.icon
                      }
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color='primary'
                      onClick={() => handleOpenModal(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Task Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant='h6' fontWeight='bold' mb={2}>
              {editingTask ? '✏️ Edit Task' : '➕ Create New Task'}
            </Typography>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label='Description'
              variant='outlined'
              multiline
              rows={3}
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label='Priority'
              value={taskData.priority}
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
              sx={{ mb: 2 }}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box display='flex' justifyContent='space-between'>
              <Button
                onClick={() => setOpenModal(false)}
                variant='outlined'
                color='secondary'
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOrUpdateTask}
                variant='contained'
                color='primary'
              >
                {editingTask ? 'Update' : 'Add'}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
