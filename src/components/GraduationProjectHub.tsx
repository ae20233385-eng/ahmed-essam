import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectTask, ProjectMilestone, TaskStatus, TaskPriority, TeamMember, GraduationTeam } from '../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Printer,
  FileCheck2,
  Users,
  AlertCircle,
  Layers,
  ChevronRight,
  Filter,
  Trash2,
  X,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  UserPlus,
  ShieldCheck,
  Building,
  GraduationCap,
} from 'lucide-react';

export const GraduationProjectHub: React.FC = () => {
  const {
    language,
    teams,
    currentTeam,
    createTeam,
    loginTeam,
    logoutTeam,
    addMemberToTeam,
    removeMemberFromTeam,
    addTaskToTeam,
    updateTaskStatusInTeam,
    deleteTaskFromTeam,
    toggleMilestoneInTeam,
    toggleQualityInTeam,
    developerCreditAr,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'members' | 'kanban' | 'timeline' | 'standards'>('members');
  const [filterDeliverable, setFilterDeliverable] = useState<string>('all');

  // Modals state
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Login form state
  const [selectedTeamIdToLogin, setSelectedTeamIdToLogin] = useState(teams[0]?.id || '');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Create Team form state
  const [teamNameInput, setTeamNameInput] = useState('');
  const [projectTitleInput, setProjectTitleInput] = useState('');
  const [supervisorInput, setSupervisorInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [universityInput, setUniversityInput] = useState('كلية الحاسبات والمعلومات');
  const [departmentInput, setDepartmentInput] = useState('Software Engineering');

  // Add Member form state
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('Backend Engineer');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberGithub, setMemberGithub] = useState('');

  // Add Task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssigneeId, setNewAssigneeId] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('high');
  const [newDueDate, setNewDueDate] = useState('2026-11-15');
  const [newDeliverable, setNewDeliverable] = useState<ProjectTask['deliverableType']>('ERD');
  const [newHours, setNewHours] = useState(10);

  // Handle Login to Team
  const handleTeamLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!selectedTeamIdToLogin) return;

    const res = loginTeam(selectedTeamIdToLogin, enteredPassword);
    if (res.success) {
      setEnteredPassword('');
    } else {
      setLoginError(res.error || (language === 'ar' ? 'كلمة المرور غير صحيحة.' : 'Invalid access password.'));
    }
  };

  // Handle Create Team
  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamNameInput.trim() || !passwordInput.trim()) return;

    createTeam(
      teamNameInput.trim(),
      projectTitleInput.trim() || 'مشروع تخرج هندسة البرمجيات',
      supervisorInput.trim(),
      passwordInput.trim(),
      universityInput.trim(),
      departmentInput.trim()
    );

    setShowCreateTeamModal(false);
    setTeamNameInput('');
    setProjectTitleInput('');
    setPasswordInput('');
  };

  // Handle Add Member
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    addMemberToTeam({
      name: memberName.trim(),
      role: memberRole.trim(),
      roleEn: memberRole.trim(),
      email: memberEmail.trim() || `${memberName.replace(/\s+/g, '').toLowerCase()}@cs.edu.eg`,
      github: memberGithub.trim() || memberName.replace(/\s+/g, '-').toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(memberName)}`,
    });

    setMemberName('');
    setMemberEmail('');
    setMemberGithub('');
    setShowAddMemberModal(false);
  };

  // Handle Add Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !currentTeam) return;

    const assignee = currentTeam.members.find(m => m.id === newAssigneeId);

    addTaskToTeam({
      title: newTitle.trim(),
      description: newDesc.trim(),
      assigneeId: assignee ? assignee.id : '',
      assigneeName: assignee ? assignee.name : (language === 'ar' ? 'غير معين' : 'Unassigned'),
      status: 'todo',
      priority: newPriority,
      dueDate: newDueDate,
      deliverableType: newDeliverable,
      estimatedHours: newHours,
      isUrgent: newPriority === 'urgent',
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddTaskModal(false);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  // If no team is currently active: show Gateway
  if (!currentTeam) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6 animate-in fade-in duration-300">
        
        {/* Gateway Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'فضاء فرق مشاريع التخرج المحمي بكلمة مرور' : 'Password-Protected Team Workspaces'}</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === 'ar' ? 'بوابة دخول ومتابعة فرق مشاريع التخرج' : 'Graduation Team Workspaces Gateway'}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'لكل فريق مشروع تخرج مساحة عمل مستقلة ومحمية بكلمة مرور؛ حيث يضيف أعضاء الفريق أنفسهم ويوزعون المهام ويتابعون التقدم في الـ ERD والـ DFD والمعمارية.'
              : 'Each graduation team has an isolated, password-protected workspace to add their own members, distribute sprint tasks, and track ERD/DFD milestones.'}
          </p>
        </div>

        {/* Two Options: Login to Existing Team or Create New Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Login to Team */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تسجيل دخول إلى فضاء الفريق' : 'Access Your Team Space'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'ar'
                    ? 'اختر فريقك وأدخل كلمة المرور السرية الخاصة بالفريق للوصول للمهام والمخططات.'
                    : 'Select your team and enter your secret team access code.'}
                </p>
              </div>

              <form onSubmit={handleTeamLogin} className="space-y-3.5 text-xs pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'ar' ? 'اختر الفريق المسجل' : 'Select Team'}
                  </label>
                  <select
                    value={selectedTeamIdToLogin}
                    onChange={e => setSelectedTeamIdToLogin(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.members.length} {language === 'ar' ? 'أعضاء' : 'members'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'ar' ? 'كلمة مرور الفريق (Access Password)' : 'Team Access Code'}
                  </label>
                  <input
                    type="password"
                    required
                    value={enteredPassword}
                    onChange={e => setEnteredPassword(e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل كلمة مرور الفريق...' : 'Enter team password...'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    {language === 'ar' ? 'للفريق الافتراضي التجريبي، كلمة المرور هي: 123' : 'For demo team, default password is: 123'}
                  </div>
                </div>

                {loginError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فتح فضاء الفريق' : 'Unlock Team Space'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Card 2: Create New Team */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'ar' ? 'تسجيل وإنشاء تيم جديد لمشروعك' : 'Register a New Team'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ar'
                    ? 'أنشئ فضاء عمل مستقل لفريقك، وعين كلمة مرور خاصة بكم لمنع التداخل مع الفرق الأخرى.'
                    : 'Create a private graduation project workspace with your own password and team members.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'كل تيم يضيف نفسه دون أي أسماء مسبقة' : 'No pre-set members: add yourselves directly'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'كلمة مرور سرية لكل تيم لحماية المهام' : 'Unique team password for privacy'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'لوحة Kanban وخطة زمنية وتقارير PDF خاصة بكم' : 'Dedicated Kanban, Milestones, and PDF audit'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCreateTeamModal(true)}
              className="w-full py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إنشاء وتسجيل تيم جديد الآن' : 'Create New Team Workspace'}</span>
            </button>
          </div>

        </div>

        {/* Create Team Modal */}
        {showCreateTeamModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تسجيل تيم مشروع تخرج جديد' : 'Register Graduation Team'}
                </h3>
                <button onClick={() => setShowCreateTeamModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTeamSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'اسم الفريق (Team Name)' : 'Team Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={teamNameInput}
                    onChange={e => setTeamNameInput(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: فريق الذكاء الاصطناعي 2027' : 'e.g. AI Pioneers Team'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'عنوان أو فكرة مشروع التخرج' : 'Graduation Project Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitleInput}
                    onChange={e => setProjectTitleInput(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: منصة إدارة المستشفيات الذكية' : 'e.g. Smart Hospital Management Platform'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {language === 'ar' ? 'المشرف الأكاديمي' : 'Supervisor Name'}
                    </label>
                    <input
                      type="text"
                      value={supervisorInput}
                      onChange={e => setSupervisorInput(e.target.value)}
                      placeholder={language === 'ar' ? 'أ.د. اسم المشرف' : 'Dr. Supervisor'}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {language === 'ar' ? 'تعيين كلمة مرور للتيم' : 'Team Password'}
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      placeholder={language === 'ar' ? 'رمز سري لحماية التيم' : 'Secret password'}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateTeamModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                  >
                    {language === 'ar' ? 'إنشاء ودخول التيم' : 'Create & Enter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // Active Team Space View
  const filteredTasks = currentTeam.tasks.filter(t => {
    if (filterDeliverable === 'all') return true;
    return t.deliverableType === filterDeliverable;
  });

  const columns: { id: TaskStatus; titleAr: string; titleEn: string; color: string }[] = [
    { id: 'todo', titleAr: 'قيد الانتظار (To Do)', titleEn: 'To Do', color: 'border-slate-300 dark:border-slate-700' },
    { id: 'in_progress', titleAr: 'جاري العمل (In Progress)', titleEn: 'In Progress', color: 'border-blue-500' },
    { id: 'review', titleAr: 'المراجعة والتدقيق (Review)', titleEn: 'Under Review', color: 'border-amber-500' },
    { id: 'done', titleAr: 'مكتمل ومعتمد (Done)', titleEn: 'Done & Approved', color: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Team Space Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>{language === 'ar' ? 'فضاء الفريق المحمي' : 'Authenticated Team Space'}</span>
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{currentTeam.university}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {currentTeam.name}
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{language === 'ar' ? 'المشروع: ' : 'Project: '}</span>
            {currentTeam.projectTitle} · <span className="text-slate-400">{language === 'ar' ? `المشرف: ${currentTeam.supervisorName}` : `Supervisor: ${currentTeam.supervisorName}`}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة عضو بالتيم' : 'Add Member'}</span>
          </button>

          <button
            onClick={() => setShowAddTaskModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة مهمة' : 'Add Task'}</span>
          </button>

          <button
            onClick={() => setShowPrintModal(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{language === 'ar' ? 'تقرير التقييم (PDF)' : 'PDF Report'}</span>
          </button>

          <button
            onClick={logoutTeam}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
            title={language === 'ar' ? 'تسجيل خروج / تبديل الفريق' : 'Switch or logout team'}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subnav Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('members')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'members'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ar' ? `أعضاء الفريق (${currentTeam.members.length})` : `Members (${currentTeam.members.length})`}
        </button>

        <button
          onClick={() => setActiveSubTab('kanban')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'kanban'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ar' ? 'لوحة مهام الفريق (Kanban)' : 'Kanban Board'}
        </button>

        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'timeline'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ar' ? 'محطات التسليم (Milestones)' : 'Timeline & Roadmap'}
        </button>

        <button
          onClick={() => setActiveSubTab('standards')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeSubTab === 'standards'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ar' ? 'معايير الجودة (ERD & DFD)' : 'Technical QA Checklist'}
        </button>
      </div>

      {/* Subtab 1: Team Members Dedicated Space */}
      {activeSubTab === 'members' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'أعضاء الفريق ومتابعة المسؤوليات' : 'Team Members & Assignments'}
            </h3>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إضافة فرد جديد في التيم' : 'Add Team Member'}</span>
            </button>
          </div>

          {currentTeam.members.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'لم تتم إضافة أعضاء في هذا الفريق بعد' : 'No team members added yet'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'ar'
                  ? 'ابدأ الآن بإضافة نفسك وزملائك في التيم مع تحديد أدوارهم (Backend, Frontend, System Analysis, QA).'
                  : 'Start adding yourselves with designated responsibilities (Backend, Frontend, System Analysis, QA).'}
              </p>
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                {language === 'ar' ? 'إضافة أول عضو بالتيم' : 'Add First Member'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTeam.members.map(member => {
                const memberTasks = currentTeam.tasks.filter(t => t.assigneeId === member.id);
                const doneTasks = memberTasks.filter(t => t.status === 'done').length;
                const rate = memberTasks.length > 0 ? Math.round((doneTasks / memberTasks.length) * 100) : 0;

                return (
                  <div
                    key={member.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                          {member.name.split(' ')[0][0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {member.name}
                          </h4>
                          <div className="text-slate-500 text-[11px]">
                            {member.role}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeMemberFromTeam(member.id)}
                        className="text-slate-400 hover:text-rose-500 transition p-1"
                        title={language === 'ar' ? 'حذف العضو' : 'Remove member'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{language === 'ar' ? 'نسبة الإنجاز' : 'Completion Rate'}</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                          {doneTasks} / {memberTasks.length} ({rate}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate max-w-[150px]">{member.email}</span>
                      <span className="font-mono text-slate-500">@{member.github}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Team Kanban Board */}
      {activeSubTab === 'kanban' && (
        <div className="space-y-4">
          
          {/* Deliverables Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold shrink-0">
              {language === 'ar' ? 'تصفية حسب نوع التسليم:' : 'Filter Deliverable:'}
            </span>
            {(['all', 'ERD', 'DFD', 'Activity Diagram', 'System Architecture', 'API', 'Frontend', 'Database'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterDeliverable(type)}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 ${
                  filterDeliverable === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? (language === 'ar' ? 'الكل' : 'All') : type}
              </button>
            ))}
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map(col => {
              const colTasks = filteredTasks.filter(t => t.status === col.id);

              return (
                <div
                  key={col.id}
                  className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {language === 'ar' ? col.titleAr : col.titleEn}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[250px]">
                    {colTasks.length === 0 ? (
                      <div className="p-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        {language === 'ar' ? 'لا توجد مهام حالياً' : 'No tasks'}
                      </div>
                    ) : (
                      colTasks.map(task => (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition space-y-2.5 text-xs group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-slate-900 dark:text-white leading-tight">
                              {task.title}
                            </span>
                            <button
                              onClick={() => deleteTaskFromTeam(task.id)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                              title={language === 'ar' ? 'حذف المهمة' : 'Delete task'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>

                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800/80">
                            <span className="font-medium text-slate-600 dark:text-slate-400">
                              👤 {task.assigneeName}
                            </span>
                            <span className={`font-semibold tabular-nums ${task.isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}>
                              📅 {task.dueDate}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1 pt-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                              {task.deliverableType}
                            </span>

                            <select
                              value={task.status}
                              onChange={e => updateTaskStatusInTeam(task.id, e.target.value as TaskStatus)}
                              className="text-[10px] bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                            >
                              <option value="todo">{language === 'ar' ? 'انتظار' : 'To Do'}</option>
                              <option value="in_progress">{language === 'ar' ? 'عمل' : 'In Prog'}</option>
                              <option value="review">{language === 'ar' ? 'مراجعة' : 'Review'}</option>
                              <option value="done">{language === 'ar' ? 'اعتماد' : 'Done'}</option>
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 3: Timeline & Roadmap */}
      {activeSubTab === 'timeline' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
            <span>
              {language === 'ar'
                ? `الخطة الزمنية ومحطات التسليم لمشروع "${currentTeam.projectTitle}" تحت إشراف ${currentTeam.supervisorName}.`
                : `Graduation roadmap for "${currentTeam.projectTitle}" supervised by ${currentTeam.supervisorName}.`}
            </span>
          </div>

          <div className="space-y-4">
            {currentTeam.milestones.map((m) => (
              <div
                key={m.id}
                className={`p-6 rounded-3xl border transition-all text-xs space-y-3 ${
                  m.status === 'completed'
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : m.status === 'in_progress'
                    ? 'border-indigo-400 dark:border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
                      {m.phaseNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {language === 'ar' ? m.title : m.titleEn}
                      </h4>
                      <div className="text-[11px] text-slate-400">
                        {language === 'ar' ? `الموعد المحدد: ${m.targetDate}` : `Target Date: ${m.targetDate}`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMilestoneInTeam(m.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
                      m.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : m.status === 'in_progress'
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {m.status === 'completed'
                        ? language === 'ar' ? 'مكتمل ومعتمد' : 'Completed'
                        : m.status === 'in_progress'
                        ? language === 'ar' ? 'المرحلة الحالية' : 'In Progress'
                        : language === 'ar' ? 'مرحلة قادمة' : 'Upcoming'}
                    </span>
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed ps-11">
                  {m.description}
                </p>

                <div className="ps-11 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-semibold text-slate-500 text-[11px] mb-1">
                    {language === 'ar' ? 'المخرجات المطلوبة للتسليم:' : 'Deliverables:'}
                  </div>
                  {m.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Quality Standards */}
      {activeSubTab === 'standards' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold block mb-0.5">
                {language === 'ar' ? 'قائمة الفحص التقني والأكاديمي (Technical Acceptance Checklist)' : 'Technical Acceptance Checklist'}
              </span>
              <span className="text-slate-400">
                {language === 'ar'
                  ? 'معايير التحكيم في مناقشة التخرج: تسوية 3NF في ERD، وتوازن DFD، ومسارات المسؤولية Swimlanes.'
                  : 'Audited checklist for academic defense excellence.'}
              </span>
            </div>
            <div className="text-end">
              <span className="text-xl font-bold text-emerald-400 tabular-nums">
                {currentTeam.qualityStandards.filter(q => q.isChecked).length} / {currentTeam.qualityStandards.length}
              </span>
              <span className="block text-[10px] text-slate-400">{language === 'ar' ? 'متحقق' : 'Verified'}</span>
            </div>
          </div>

          <div className="space-y-3">
            {currentTeam.qualityStandards.map(item => (
              <div
                key={item.id}
                onClick={() => toggleQualityInTeam(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                  item.isChecked
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">
                        {item.title}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                        {item.ruleExplanation}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'إضافة عضو جديد في الفريق' : 'Add Team Member'}
              </h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'اسم العضو (Student Name)' : 'Member Name'}
                </label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسم الطالب...' : 'Enter student name...'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'المسؤولية والدور البرمجي' : 'Role / Responsibility'}
                </label>
                <select
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="Team Lead & System Analyst">{language === 'ar' ? 'قائد الفريق ومحلل النظم (Team Lead & System Analyst)' : 'Team Lead & System Analyst'}</option>
                  <option value="Backend Architect & APIs">{language === 'ar' ? 'مهندس الباك إند والخوادم (Backend Architect)' : 'Backend Architect'}</option>
                  <option value="Frontend Lead & UI/UX">{language === 'ar' ? 'مهندس الواجهات وتجربة المستخدم (Frontend Lead)' : 'Frontend Lead'}</option>
                  <option value="Database & QA Engineer">{language === 'ar' ? 'مهندس قواعد البيانات وضمان الجودة (Database & QA)' : 'Database & QA'}</option>
                  <option value="AI & Machine Learning Engineer">{language === 'ar' ? 'مهندس الذكاء الاصطناعي (AI Engineer)' : 'AI Engineer'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={e => setMemberEmail(e.target.value)}
                    placeholder="student@cs.edu.eg"
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={memberGithub}
                    onChange={e => setMemberGithub(e.target.value)}
                    placeholder="username"
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                >
                  {language === 'ar' ? 'إضافة إلى التيم' : 'Add to Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? `إضافة مهمة لفريق "${currentTeam.name}"` : 'Add Team Task'}
              </h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'عنوان المهمة التقنية' : 'Task Title'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: تصميم جداول الـ ERD وتدقيق 3NF' : 'e.g. Design ERD schema'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'ar' ? 'الوصف ومواصفات التسليم' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder={language === 'ar' ? 'حدد معايير القبول للمهمة...' : 'Details...'}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'العضو المسؤول بالتيم' : 'Assignee'}
                  </label>
                  <select
                    value={newAssigneeId}
                    onChange={e => setNewAssigneeId(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? '-- بدون تعيين --' : '-- Unassigned --'}</option>
                    {currentTeam.members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'نوع التسليم التقني' : 'Deliverable Type'}
                  </label>
                  <select
                    value={newDeliverable}
                    onChange={e => setNewDeliverable(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="ERD">ERD</option>
                    <option value="DFD">DFD</option>
                    <option value="Activity Diagram">Activity Diagram</option>
                    <option value="System Architecture">System Architecture</option>
                    <option value="API">API</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Database">Database</option>
                    <option value="Documentation">Documentation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'تاريخ التسليم' : 'Due Date'}
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'الأولوية' : 'Priority'}
                  </label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="urgent">{language === 'ar' ? 'عاجلة جداً' : 'Urgent'}</option>
                    <option value="high">{language === 'ar' ? 'عالية' : 'High'}</option>
                    <option value="medium">{language === 'ar' ? 'متوسطة' : 'Medium'}</option>
                    <option value="low">{language === 'ar' ? 'عادية' : 'Low'}</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                >
                  {language === 'ar' ? 'حفظ المهمة' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Export Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 no-print">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? `تقرير تقييم أداء فريق "${currentTeam.name}"` : 'Official Team Evaluation Report'}
                </h3>
              </div>
              <button onClick={() => setShowPrintModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Report Box */}
            <div id="printable-report" className="p-6 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 space-y-6 text-xs">
              <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-lg uppercase tracking-tight">
                    {language === 'ar' ? 'تقرير متابعة وتقييم مشروع التخرج' : 'Graduation Milestone Performance Report'}
                  </div>
                  <div className="text-slate-500">
                    {currentTeam.university} — {currentTeam.department}
                  </div>
                  <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {language === 'ar' ? `مشروع: ${currentTeam.projectTitle}` : `Project: ${currentTeam.projectTitle}`}
                  </div>
                </div>
                <div className="text-end text-[11px] text-slate-500 font-mono">
                  <div>{new Date().toISOString().slice(0, 10)}</div>
                  <div className="text-[10px] text-slate-400">{developerCreditAr}</div>
                </div>
              </div>

              {/* Members Breakdown Table */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'تقييم مساهمة أعضاء الفريق:' : 'Team Members Contribution Breakdown:'}
                </h4>
                {currentTeam.members.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">{language === 'ar' ? 'لم تتم إضافة أعضاء بعد.' : 'No members registered yet.'}</p>
                ) : (
                  <table className="w-full text-start text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <th className="p-2 text-start">{language === 'ar' ? 'اسم الطالب' : 'Student Name'}</th>
                        <th className="p-2 text-start">{language === 'ar' ? 'الدور والمسؤولية' : 'Role'}</th>
                        <th className="p-2 text-center">{language === 'ar' ? 'المهام المنجزة' : 'Done'}</th>
                        <th className="p-2 text-center">{language === 'ar' ? 'معدل الإنجاز' : 'Velocity'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {currentTeam.members.map(m => {
                        const mTasks = currentTeam.tasks.filter(t => t.assigneeId === m.id);
                        const mDone = mTasks.filter(t => t.status === 'done').length;
                        const rate = mTasks.length > 0 ? Math.round((mDone / mTasks.length) * 100) : 0;
                        return (
                          <tr key={m.id}>
                            <td className="p-2 font-medium">{m.name}</td>
                            <td className="p-2 text-slate-500">{m.role}</td>
                            <td className="p-2 text-center tabular-nums">{mDone}/{mTasks.length}</td>
                            <td className="p-2 text-center font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{rate}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Quality Checklist Status */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'حالة مراجعة معايير التسليم التقنية (ERD, DFD, Architecture):' : 'Quality Standards Status:'}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {currentTeam.qualityStandards.map(q => (
                    <div key={q.id} className="flex items-center gap-1.5">
                      <span className={q.isChecked ? 'text-emerald-500' : 'text-slate-400'}>
                        {q.isChecked ? '✓' : '○'}
                      </span>
                      <span className="truncate">{q.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>{language === 'ar' ? `المشرف الأكاديمي: ${currentTeam.supervisorName}` : `Academic Supervisor: ${currentTeam.supervisorName}`}</span>
                <span>{language === 'ar' ? 'توقيع قائد الفريق: ___________________' : 'Team Lead Signature: ___________________'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 no-print">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={handleTriggerPrint}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'ar' ? 'طباعة / حفظ كملف PDF' : 'Print / Save PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
