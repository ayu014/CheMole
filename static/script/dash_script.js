// Main JavaScript file for MoleculeAI Drug Discovery Assistant

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initNavigation();
    initSidebar();
    initMoleculeViewer();
    initSliders();
    initTabs();
    initModal();
    initMoleculeGrid();
    
    // Setup event listeners for buttons
    setupButtonListeners();
});

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real app, we would load the corresponding page content here
            console.log(`Navigating to ${this.dataset.page} page`);
            
            // For demo purposes, show a toast notification
            showToast(`Navigating to ${this.dataset.page} page`);
        });
    });
}

// Sidebar functionality
function initSidebar() {
    // Project selection
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        if (!item.classList.contains('add-project')) {
            item.addEventListener('click', function() {
                projectItems.forEach(proj => {
                    if (!proj.classList.contains('add-project')) {
                        proj.classList.remove('active');
                    }
                });
                
                this.classList.add('active');
                console.log(`Selected project: ${this.textContent}`);
                
                // Update the molecule viewer based on the selected project
                updateMoleculeDisplay(this.dataset.projectId);
            });
        }
    });
    
    // Add new project
    const addProjectBtn = document.querySelector('.add-project');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            // In a real app, this would open a modal to create a new project
            console.log('Creating new project');
            showToast('Creating new project...');
            
            // Mock creating a new project
            setTimeout(() => {
                const sidebar = document.querySelector('.sidebar-section');
                const newProjectItem = document.createElement('div');
                newProjectItem.className = 'project-item';
                newProjectItem.dataset.projectId = Date.now();
                newProjectItem.textContent = 'New Research Project';
                
                // Insert before the add-project button
                sidebar.insertBefore(newProjectItem, addProjectBtn);
                
                // Add event listener to the new project
                newProjectItem.addEventListener('click', function() {
                    projectItems.forEach(proj => {
                        if (!proj.classList.contains('add-project')) {
                            proj.classList.remove('active');
                        }
                    });
                    
                    this.classList.add('active');
                });
                
                showToast('New project created successfully!');
            }, 1000);
        });
    }
    
    // Tool items
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log(`Selected tool: ${this.textContent}`);
            showToast(`Launching ${this.textContent}...`);
            
            // Mock loading the tool
            showLoading(`Initializing ${this.textContent}...`);
            
            setTimeout(() => {
                hideLoading();
                showToast(`${this.textContent} ready to use`);
            }, 1500);
        });
    });
    
    // History items
    const historyItems = document.querySelectorAll('.history-item');
    
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log(`Accessing history item: ${this.textContent}`);
            showToast(`Loading: ${this.textContent}`);
            
            // Mock loading the history item
            showLoading('Retrieving previous work...');
            
            setTimeout(() => {
                hideLoading();
                document.getElementById('smiles-input').value = 'CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=NC=CC(=N4)C5=CN=CC=C5';
                loadSmilesStructure();
                showToast(`${this.textContent} loaded successfully`);
            }, 1200);
        });
    });
}

// Molecule viewer functionality
function initMoleculeViewer() {
    const loadSmilesBtn = document.getElementById('load-smiles');
    
    if (loadSmilesBtn) {
        loadSmilesBtn.addEventListener('click', loadSmilesStructure);
    }
    
    const optimizeBtn = document.getElementById('optimize-btn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', function() {
            showLoading('Optimizing molecular structure...');
            
            setTimeout(() => {
                hideLoading();
                updateMoleculeSVG();
                updateProperties();
                showToast('Structure optimization complete');
            }, 1500);
        });
    }
    
    const editBtn = document.getElementById('edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            showToast('Opening structure editor...');
            // In a real app, this would open a molecule editor
        });
    }
}

function loadSmilesStructure() {
    const smilesInput = document.getElementById('smiles-input');
    
    if (smilesInput && smilesInput.value.trim() !== '') {
        showLoading('Processing SMILES string...');
        
        setTimeout(() => {
            hideLoading();
            updateMoleculeSVG();
            updateProperties();
            showToast('Molecule structure loaded');
        }, 1000);
    } else {
        showToast('Please enter a valid SMILES string', 'error');
    }
}

function updateMoleculeSVG() {
    // In a real app, this would render the molecule based on the SMILES string
    // For demo purposes, we'll just update the existing SVG
    const moleculeSVG = document.querySelector('.molecule-svg');
    
    if (moleculeSVG) {
        // Generate a slightly different molecule each time
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        const circles = moleculeSVG.querySelectorAll('circle');
        
        circles.forEach(circle => {
            if (Math.random() > 0.5) {
                circle.setAttribute('fill', randomColor);
            }
            
            // Slightly move the circles
            const cx = parseFloat(circle.getAttribute('cx'));
            const cy = parseFloat(circle.getAttribute('cy'));
            
            circle.setAttribute('cx', cx + (Math.random() * 10 - 5));
            circle.setAttribute('cy', cy + (Math.random() * 10 - 5));
        });
    }
}

function updateProperties() {
    // Update the molecule properties with random values for demo purposes
    document.getElementById('mol-weight').textContent = (Math.random() * 300 + 200).toFixed(1) + ' g/mol';
    document.getElementById('logp').textContent = (Math.random() * 5).toFixed(1);
    document.getElementById('hbond-donors').textContent = Math.floor(Math.random() * 5);
    document.getElementById('hbond-acceptors').textContent = Math.floor(Math.random() * 7);
    document.getElementById('bioavailability').textContent = (Math.random() * 0.5 + 0.5).toFixed(2);
    document.getElementById('synth-access').textContent = (Math.random() * 5 + 1).toFixed(1);
    
    // Update the radar chart
    updateRadarChart();
}

function updateRadarChart() {
    const chart = document.getElementById('druglikeness-chart');
    
    if (chart) {
        // Generate random polygon points for the chart
        const innerPolygon = chart.querySelector('polygon:nth-child(2)');
        
        if (innerPolygon) {
            const center = 75;
            const points = [];
            
            // Generate 4 random points around the center
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2); // 90-degree increments
                const distance = Math.random() * 30 + 20; // Distance from center
                
                const x = center + Math.cos(angle) * distance;
                const y = center + Math.sin(angle) * distance;
                
                points.push(`${x},${y}`);
            }
            
            innerPolygon.setAttribute('points', points.join(' '));
        }
    }
}

// Initialize sliders
function initSliders() {
    initSlider('similarity-slider', 'similarity-value');
    initSlider('novelty-slider', 'novelty-value');
    initSlider('affinity-slider', 'affinity-value');
}

function initSlider(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
        const thumb = slider.querySelector('.slider-thumb');
        
        if (thumb) {
            let isDragging = false;
            
            // Get initial percentage from left style
            const leftStyle = thumb.style.left;
            let percentage = parseInt(leftStyle) || 50;
            
            // Update the value display
            valueDisplay.textContent = `${percentage}%`;
            
            thumb.addEventListener('mousedown', function(e) {
                isDragging = true;
                e.preventDefault(); // Prevent text selection
            });
            
            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    const rect = slider.getBoundingClientRect();
                    let x = e.clientX - rect.left;
                    
                    // Constrain within the slider
                    if (x < 0) x = 0;
                    if (x > rect.width) x = rect.width;
                    
                    // Calculate percentage
                    percentage = Math.round((x / rect.width) * 100);
                    
                    // Update thumb position
                    thumb.style.left = `${percentage}%`;
                    
                    // Update value display
                    valueDisplay.textContent = `${percentage}%`;
                }
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            // Handle clicks directly on the slider
            slider.addEventListener('click', function(e) {
                const rect = slider.getBoundingClientRect();
                let x = e.clientX - rect.left;
                
                // Calculate percentage
                percentage = Math.round((x / rect.width) * 100);
                
                // Update thumb position
                thumb.style.left = `${percentage}%`;
                
                // Update value display
                valueDisplay.textContent = `${percentage}%`;
            });
        }
    }
}

// Tabs functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get all tabs in the same container
            const tabContainer = this.parentElement;
            const allTabs = tabContainer.querySelectorAll('.tab');
            
            // Remove active from all tabs
            allTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.add('inactive');
            });
            
            // Add active to clicked tab
            this.classList.remove('inactive');
            this.classList.add('active');
            
            // In a real app, switch the content based on the tab
            console.log(`Selected tab: ${this.dataset.tab}`);
            
            // Update molecule grid based on the selected tab
            updateMoleculeGrid(this.dataset.tab);
        });
    });
    
    // Analysis tabs
    const analysisTabs = document.querySelectorAll('.analysis-tab');
    
    analysisTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get all tabs in the same container
            const tabContainer = this.parentElement;
            const allTabs = tabContainer.querySelectorAll('.analysis-tab');
            
            // Remove active from all tabs
            allTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Load analysis content based on the selected tab
            loadAnalysisContent(this.dataset.analysisTab);
        });
    });
}

function loadAnalysisContent(tabName) {
    const contentContainer = document.getElementById('analysis-content');
    
    if (contentContainer) {
        // In a real app, you would load the content from an API
        // For demo purposes, we'll just show different content based on the tab
        
        let content = '';
        
        switch (tabName) {
            case 'admet':
                content = `
                    <div class="analysis-section">
                        <h3>ADMET Properties</h3>
                        <div class="analysis-table">
                            <div class="analysis-row">
                                <div class="analysis-cell">Absorption</div>
                                <div class="analysis-cell">High (86%)</div>
                            </div>
                            <div class="analysis-row">
                                <div class="analysis-cell">Distribution</div>
                                <div class="analysis-cell">Medium (58%)</div>
                            </div>
                            <div class="analysis-row">
                                <div class="analysis-cell">Metabolism</div>
                                <div class="analysis-cell">CYP2D6 Substrate</div>
                            </div>
                            <div class="analysis-row">
                                <div class="analysis-cell">Excretion</div>
                                <div class="analysis-cell">Half-life: 4.2 hours</div>
                            </div>
                            <div class="analysis-row">
                                <div class="analysis-cell">Toxicity</div>
                                <div class="analysis-cell">Low (LD50 > 500 mg/kg)</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'docking':
                content = `
                    <div class="analysis-section">
                        <h3>Molecular Docking Results</h3>
                        <div class="docking-score">
                            <div class="score-label">Binding Affinity:</div>
                            <div class="score-value">-8.7 kcal/mol</div>
                        </div>
                        <div class="docking-interactions">
                            <h4>Key Interactions:</h4>
                            <ul>
                                <li>Hydrogen bond with GLY143 (2.1Å)</li>
                                <li>Hydrogen bond with HIS163 (1.9Å)</li>
                                <li>Hydrophobic interaction with MET49</li>
                                <li>π-stacking with PHE140</li>
                            </ul>
                        </div>
                        <div class="docking-image">
                            [3D Visualization would be displayed here]
                        </div>
                    </div>
                `;
                break;
                
            case 'toxicity':
                content = `
                    <div class="analysis-section">
                        <h3>Toxicity Predictions</h3>
                        <div class="tox-predictions">
                            <div class="tox-item">
                                <div class="tox-name">Carcinogenicity</div>
                                <div class="tox-probability">Low (12%)</div>
                            </div>
                            <div class="tox-item">
                                <div class="tox-name">Mutagenicity</div>
                                <div class="tox-probability">Very Low (3%)</div>
                            </div>
                            <div class="tox-item">
                                <div class="tox-name">Hepatotoxicity</div>
                                <div class="tox-probability">Medium (47%)</div>
                            </div>
                            <div class="tox-item">
                                <div class="tox-name">Cardiotoxicity</div>
                                <div class="tox-probability">Low (18%)</div>
                            </div>
                            <div class="tox-item">
                                <div class="tox-name">Cytotoxicity</div>
                                <div class="tox-probability">Low (23%)</div>
                            </div>
                        </div>
                        <div class="tox-summary">
                            <h4>Summary:</h4>
                            <p>The compound shows favorable toxicity profile with some concerns about hepatotoxicity that may require further investigation.</p>
                        </div>
                    </div>
                `;
                break;
                
            default:
                content = '<div>No content available for this tab.</div>';
        }
        
        contentContainer.innerHTML = content;
    }
}

// Modal functionality
function initModal() {
    const analysisBtn = document.getElementById('analyze-btn');
    const modal = document.getElementById('analysis-modal');
    const closeBtn = document.querySelector('.modal-close');
    const closeAnalysisBtn = document.getElementById('close-analysis');
    const exportAnalysisBtn = document.getElementById('export-analysis');
    
    if (analysisBtn && modal) {
        analysisBtn.addEventListener('click', function() {
            showLoading('Running advanced analysis...');
            
            setTimeout(() => {
                hideLoading();
                modal.style.display = 'flex';
                // Load initial content
                loadAnalysisContent('admet');
            }, 2000);
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (closeAnalysisBtn) {
        closeAnalysisBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (exportAnalysisBtn) {
        exportAnalysisBtn.addEventListener('click', function() {
            showToast('Exporting analysis report...');
            
            setTimeout(() => {
                showToast('Analysis report exported successfully');
            }, 1500);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Molecule grid functionality
function initMoleculeGrid() {
    const thumbnails = document.querySelectorAll('.molecule-thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const thumbnailBoxes = document.querySelectorAll('.thumbnail-box');
            
            // Remove active from all thumbnails
            thumbnailBoxes.forEach(box => box.classList.remove('active'));
            
            // Add active to clicked thumbnail
            const thumbnailBox = this.querySelector('.thumbnail-box');
            if (thumbnailBox) {
                thumbnailBox.classList.add('active');
            }
            
            // In a real app, load the selected molecule
            console.log(`Selected molecule: ${this.dataset.moleculeId}`);
            
            // Update the molecule viewer
            showLoading('Loading molecule data...');
            
            setTimeout(() => {
                hideLoading();
                updateMoleculeSVG();
                updateProperties();
                showToast('Molecule loaded successfully');
            }, 1200);
        });
    });
    
    // Pagination
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicator = document.querySelector('.page-indicator');
    
    let currentPage = 1;
    const totalPages = 3;
    
    if (prevBtn && nextBtn && pageIndicator) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePageIndicator();
                updateMoleculeGrid();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageIndicator();
                updateMoleculeGrid();
            }
        });
    }
    
    function updatePageIndicator() {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}

function updateMoleculeGrid(tabType = null) {
    // In a real app, you would load different molecules based on the tab
    // For demo purposes, we'll just update the match percentages
    
    const thumbnails = document.querySelectorAll('.molecule-thumbnail');
    const labels = document.querySelectorAll('.thumbnail-label');
    
    if (tabType) {
        // Different percentage ranges based on tab type
        let minPercentage, maxPercentage;
        
        switch (tabType) {
            case 'similar':
                minPercentage = 80;
                maxPercentage = 95;
                break;
                
            case 'novel':
                minPercentage = 50;
                maxPercentage = 75;
                break;
                
            case 'optimal':
                minPercentage = 85;
                maxPercentage = 99;
                break;
                
            default:
                minPercentage = 75;
                maxPercentage = 95;
        }
        
        // Update the labels
        labels.forEach(label => {
            const percentage = Math.floor(Math.random() * (maxPercentage - minPercentage + 1)) + minPercentage;
            label.textContent = `${percentage}% Match`;
        });
        
        // Make the first thumbnail active
        const thumbnailBoxes = document.querySelectorAll('.thumbnail-box');
        thumbnailBoxes.forEach((box, index) => {
            if (index === 0) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }
}

function updateMoleculeDisplay(projectId) {
    // In a real app, you would load molecule data based on the project
    // For demo purposes, we'll just update the SMILES string
    
    let smilesString = '';
    
    switch (projectId) {
        case '1':
            smilesString = 'CC(=O)OC1=CC=CC=C1C(=O)O';
            break;
            
        case '2':
            smilesString = 'CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=NC=CC(=N4)C5=CN=CC=C5';
            break;
            
        case '3':
            smilesString = 'CC(C)CN(CC1=CC=C(C=C1)C(=O)NC2=CC=C(C=C2)C(F)(F)F)S(=O)(=O)C3=CC=CC=C3';
            break;
            
        default:
            smilesString = 'C1=CC=CC=C1';
    }
    
    document.getElementById('smiles-input').value = smilesString;
    loadSmilesStructure();
}

// Setup button listeners
function setupButtonListeners() {
    const generateBtn = document.getElementById('generate-btn');
    const moreCompoundsBtn = document.getElementById('more-compounds-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            showLoading('Generating compounds with AI...');
            
            setTimeout(() => {
                hideLoading();
                updateMoleculeGrid();
                showToast('Generated 3 new compounds');
            }, 2500);
        });
    }
    
    if (moreCompoundsBtn) {
        moreCompoundsBtn.addEventListener('click', function() {
            showLoading('Expanding compound search...');
            
            setTimeout(() => {
                hideLoading();
                showToast('Generated 3 additional compounds');
            }, 2000);
        });
    }
}

// Loading overlay
function showLoading(message) {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.querySelector('.loading-text');
    
    if (overlay && loadingText) {
        loadingText.textContent = message || 'Processing...';
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Toast notification
function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
        
        // Add CSS for the toast
        const style = document.createElement('style');
        style.textContent = `
            #toast-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 300px;
                background-color: #2c3e50;
                color: white;
                padding: 12px 20px;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s;
                font-size: 14px;
            }
            
            #toast-notification.info {
                background-color: #3498db;
            }
            
            #toast-notification.success {
                background-color: #2ecc71;
            }
            
            #toast-notification.error {
                background-color: #e74c3c;
            }
            
            #toast-notification.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set message and type
    toast.textContent = message;
    toast.className = type;
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}